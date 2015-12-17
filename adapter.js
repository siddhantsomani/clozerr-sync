Promise < long> create_beacon(String Beacon_name, String major, String minor, String place, String comments= "");//Should the uuid also be an argument?
Promise < Object > get_beacon(String major, String minor, String Beacon_name= "");
Promise < Object > set_beacon(String Beacon_id,String Beacon_name,String major, String minor,String place, String comments= "");
Promise < void> remove_beacon(String major, String minor, String Beacon_name= "");

Promise < void> create_rule(String rule_name, String beacon_id, String trigger_on, long trigger_after= 0);
Promise < void> remove_rule(String rule_name);
Promise < Object > get_rule(String rule_name, String beacon_id);

Promise < void> create_place(String name, String latitude, String longitude, long geofence= 500);//loc[0]=latitude
Promise < Object> set_place(String name, String latitude, String longitude, long geofence= 500);
Promise < void> remove_place(String name );
Promise < Object > get_place(String major, String minor );

Promise < void> create_action(String rule_name, String action_name, String message, String type= "custom");
Promise < void> remove_action(String rule_name, String action_name );
Promise < Object > get_action(String rule_name, String action_name );
