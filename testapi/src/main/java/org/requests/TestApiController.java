package org.requests;

import org.requests.Method;
import org.requests.payload.request.TestApiRequest;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.Serializable;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/microservice/testapi")
public class TestApiController {
    @PostMapping("/checkApi")
    public Serializable testApi(@Valid @RequestBody TestApiRequest testApiRequest) {
        Serializable response = (redirectMethod(testApiRequest));
        return response;
    }

    public Serializable redirectMethod(TestApiRequest request) {
        return new RequestController(request).getAnswer();
    }
}
