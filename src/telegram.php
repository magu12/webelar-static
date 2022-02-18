<?php

if(isset($_POST['name']) || isset($_POST['phone']) || isset($_POST['time']) || isset($_POST['pricing'])){

	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$time = $_POST['time'];
	$pricing = $_POST['pricing'];

	if(!empty($name) && !empty($phone)){

		$token = "1807147181:AAFG0OMHyRIyY00jWG7VeVRtLirW5WIRDIs";

		$chat_id = "-1001207904217";

		$arr = array(
			'Имя пользователя: ' => $name,
			'Телефон: ' => $phone,
			'Желаемое время связи: ' => $time,			
			'Выбранный пакет: ' => $pricing
		);

		foreach($arr as $key => $value) {
			$txt .= "<b>".$key."</b> ".$value."%0A";
		};

		if (sendMessage($chat_id,$txt, $token)) {
			echo "true";
		} else {

			mail('dev@webelar.by', 'Feedback', "Имя пользователя: ".$name."\r\n"."Телефон: ".$phone."\r\n"."Желаемое время связи: ".$time."\r\n"."Выбранный пакет: ".$pricing);
			
			echo "false";
		}
	}
	else{
		echo "empty";
	}

}
else{
	echo "no access";
}


function sendMessage($chatID, $messaggio, $token) {
	echo "sending message to " . $chatID . "\n";

	$url = "https://api.telegram.org/bot" . $token . "/sendMessage?chat_id=" . $chatID;
	$url = $url . "&parse_mode=html&text=" . $messaggio;
	$ch = curl_init();
	$optArray = array(
		CURLOPT_URL => $url,
		CURLOPT_RETURNTRANSFER => true
	);
	curl_setopt_array($ch, $optArray);
	$result = curl_exec($ch);
	curl_close($ch);
	return $result;
}

?>