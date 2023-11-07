package ca.etsmtl.selenium.requests.payload.request;

import lombok.Getter;

@Getter
public class SeleniumAction {
    int action_id;
    int action_type_id;
    String action_type_name;
    String object;
    String input;
    String target;
}
