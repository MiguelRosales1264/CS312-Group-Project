<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color Generation</title>
</head>
<header>
    <h1> Color Generation </h1>
</header>
<main>
    <?php
        session_start();
        $error = "";

        // Set input values, validate correct range
        if (isset($_POST["rows"])) {
            $rows = $_POST["rows"];
            if ($rows < 1 || $rows > 1000) {
                $error = "Rows must be 1-1000";
            }
        }
        if (isset($_POST["columns"])) {
            $columns = $_POST["columns"];
            if ($columns < 1 || $columns > 702) {
                $error = "Columns must be 1-702";
            }
        }
        if (isset($_POST["colors"])) {
            $colors = $_POST["colors"];
            if ($colors < 1 || $colors > 10) {
                $error = "Colors must be 1-10";
            }
        }  

        if (empty($error)) {
            $_SESSION['rows'] = $rows;
            $_SESSION['columns'] = $columns;
            $_SESSION['colors'] = $colors;
        }
    ?>
    
    <form method="POST" action="color-generation.component.php">
        <label>Rows:nbsp</label>
        <input type="number" name="rows"></input> <br>
        <label>Columns:nbsp</label>
        <input type="number" name="columns"></input> <br>
        <label>Colors:nbsp</label>
        <input type="number" name="colors"></input> <br>
        <input type="submit" value="Generate">
    </form>
    <p>$error</p>
</html>

<router-outlet></router-outlet>