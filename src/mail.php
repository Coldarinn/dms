<?php
    use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);
    $to = "sales@delomain.com";
    $from = "Form: Сообщение с сайта <delomain.com>\r\n";
    $email = $_POST['email'];
    $question = $_POST["question"];
    $theme = 'Сообщение с delomain.com';
    $page = 'Delomain Studio';
    $message = '
    <html>
    <body>
    <center>
    <table border=1 cellpadding=6 cellspacing=0 width=90% bordercolor="#DBDBDB">
     <tr><td colspan=2 align=center bgcolor="#E4E4E4"><b>Информация</b></td></tr>
     <tr>
      <td><b>Откуда</b></td>
      <td>'.$page.'</td>
     </tr>
      <td><b>Почта</b></td>
      <td>'.$email.'</td>
     </tr>
     <tr>
      <td><b>Вопрос</b></td>
      <td>'.$question.'</td>
     </tr>
    </table>
    </center>
    </body>
    </html>';
    //$headers  = "Content-type: text/html; charset=utf-8\r\n";
    //$headers .= $from;

    //От кого письмо
    $mail->setFrom('info@fls.ru', 'Сообщение с DMS');
    //Кому отправить
    $mail->addAddress('sales@delomain.com');
    //Тема письма
    $mail->Subject = 'Сообщение с DMS"';
    //Тело письма
    $body = $message;

    $mail->Body = $body;
//     $domain = substr(strrchr($email, "@"), 1);
//     $res = getmxrr($domain, $mx_records, $mx_weight);
//     if (false == $res || 0 == count($mx_records) || (1 == count($mx_records) && ($mx_records[0] == null  || $mx_records[0] == "0.0.0.0" ) ) ){
//         echo 1;
//     }else{
//         mail($to, $theme, $message, $headers);
//     }
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>