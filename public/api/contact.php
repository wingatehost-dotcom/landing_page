<?php
/**
 * Contact form handler for the static Wingate College One Member PLC website.
 *
 * Place this file at public_html/api/contact.php on cPanel.
 * The form posts JSON when NEXT_PUBLIC_FORM_MODE=endpoint and
 * NEXT_PUBLIC_FORM_ENDPOINT=/api/contact.php is set at build time.
 *
 * Configure the recipient below, or set the CONTACT_TO_EMAIL environment
 * variable in cPanel. Never commit a real password here.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Allow only same-origin requests by default. Set to your domain in production.
$allowedOrigin = getenv('CONTACT_ALLOWED_ORIGIN') ?: '';
if ($allowedOrigin !== '') {
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

/** Form recipient — replace or set CONTACT_TO_EMAIL in cPanel. */
$to = getenv('CONTACT_TO_EMAIL') ?: 'wingatehost@gmail.com';
$fromDomain = getenv('CONTACT_FROM_DOMAIN') ?: ($_SERVER['HTTP_HOST'] ?? 'localhost');

$raw = file_get_contents('php://input');
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

if (stripos($contentType, 'application/json') !== false) {
    $data = json_decode($raw, true);
} else {
    $data = $_POST;
}

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid request body']);
    exit;
}

// Honeypot: silently accept so bots do not learn the rule.
if (!empty($data['honeypot']) || !empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$fullName = trim((string) ($data['fullName'] ?? ''));
$organization = trim((string) ($data['organization'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$division = trim((string) ($data['division'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

$errors = [];

if ($fullName === '' || mb_strlen($fullName) < 2) {
    $errors[] = 'fullName';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}
if ($phone === '' || !preg_match('/^[0-9+()\-\s]{7,20}$/', $phone)) {
    $errors[] = 'phone';
}
if ($division === '') {
    $errors[] = 'division';
}
if ($message === '' || mb_strlen($message) < 10) {
    $errors[] = 'message';
}
if (mb_strlen($message) > 5000 || mb_strlen($fullName) > 200) {
    $errors[] = 'length';
}

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Validation failed', 'fields' => $errors]);
    exit;
}

// Strip newlines from values used in mail headers to prevent header injection.
$safeName = str_replace(["\r", "\n"], ' ', $fullName);
$safeEmail = str_replace(["\r", "\n"], '', $email);

$subject = 'Website inquiry - ' . ($division !== '' ? $division : 'General');

$body = "New inquiry from the website\n\n"
    . "Full name: {$safeName}\n"
    . "Organization: " . ($organization !== '' ? $organization : '-') . "\n"
    . "Email: {$safeEmail}\n"
    . "Phone: {$phone}\n"
    . "Division of interest: {$division}\n\n"
    . "Message:\n{$message}\n";

$headers = [
    'From: Website <no-reply@' . preg_replace('/[^a-z0-9.\-]/i', '', $fromDomain) . '>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail could not be sent']);
    exit;
}

echo json_encode(['ok' => true]);
