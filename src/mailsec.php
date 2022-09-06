<?php
$to = "sales@delomain.com";
$from = "Form: Заявка с сайта <delomain.com>\r\n";
$name = $_POST["name"];
$phone = $_POST["phone"];
$email = $_POST['email'];
$message = $_POST["message"];
$category = $_POST["category"];
$theme = 'Заявка с delomain.com';
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
 <tr>
  <td><b>Имя</b></td>
  <td>'.$name.'</td>
 </tr>
 <tr>
   <td><b>Телефон</b></td>
   <td>'.$phone.'</td>
  </tr>
  <tr>
    <td><b>Почта</b></td>
    <td>'.$email.'</td>
   </tr>
   <tr>
     <td><b>Сообщение</b></td>
     <td>'.$message.'</td>
    </tr>
 <tr>
  <td><b>Категория</b></td>
  <td>'.$category.'</td>
 </tr>
</table>
</center>
</body>
</html>';
$headers  = "Content-type: text/html; charset=utf-8\r\n";
$headers .= $from;

$domain = substr(strrchr($email, "@"), 1);
$res = getmxrr($domain, $mx_records, $mx_weight);
if (false == $res || 0 == count($mx_records) || (1 == count($mx_records) && ($mx_records[0] == null  || $mx_records[0] == "0.0.0.0" ) ) ){
	echo 1;
}else{
	mail($to, $theme, $message, $headers);
}