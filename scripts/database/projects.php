<?php 

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$connector = new mysqli("localhost", "root", "", "portfolio_db");

if($connector->connect_error){
    die("Connection failed: " . $connector->connect_error);
}

// RETRIEVING PROJECTS
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $connector->query("SELECT * FROM portfolio ORDER BY projectNum ASC");
 
    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Query failed: " . $connector->error]);
        exit;
    }
 
    $projects = [];
    while ($row = $result->fetch_assoc()) {
        // Normalize tags: support both comma and dot as separators
        $tags = preg_split('/[,\.]+/', $row['projectTag']);
        $tags = array_map('trim', $tags);
        $tags = array_filter($tags);
 
        $projects[] = [
            "id"      => $row['projectNum'],
            "lang"    => $row['subject'],
            "title"   => $row['projectName'],
            "tags"    => array_values($tags),
            "href"    => $row['details']
        ];
    }
 
    echo json_encode($projects);
}
 
// INSERTING NEW PROJECT
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents("php://input"), true);
 
    $lang    = trim($body['lang']    ?? '');
    $title   = trim($body['title']   ?? '');
    $tags    = trim($body['tags']    ?? '');
    $details = trim($body['details'] ?? '');
 
    if (!$lang || !$title || !$tags || !$details) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }
 
    $stmt = $connector->prepare(
        "INSERT INTO portfolio (subject, projectName, projectTag, details) VALUES (?, ?, ?, ?)"
    );
    $stmt->bind_param("ssss", $lang, $title, $tags, $details);
 
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "id" => $connector->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Insert failed: " . $stmt->error]);
    }
 
    $stmt->close();
}
 
else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}
 
$connector->close();

?>