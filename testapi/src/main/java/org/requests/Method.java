package org.requests;

import org.requests.payload.request.TestApiRequest;
import io.restassured.specification.RequestSpecification;
import io.restassured.response.Response;

public enum Method {
    GET {
        @Override
        public Response execute(RequestSpecification httpRequest, String apiUrl) {
            return httpRequest.get(apiUrl);
        }
    },
    HEAD {
        @Override
        public Response execute(RequestSpecification httpRequest, String apiUrl) {
            return httpRequest.head(apiUrl);
        }
    },
    POST {
        @Override
        public Response execute(RequestSpecification httpRequest, String apiUrl) {
            return httpRequest.post(apiUrl);
        }
    },
    PUT {
        @Override
        public Response execute(RequestSpecification httpRequest, String apiUrl) {
            return httpRequest.put(apiUrl);
        }
    },
    DELETE {
        @Override
        public Response execute(RequestSpecification httpRequest, String apiUrl) {
            return httpRequest.delete(apiUrl);
        }
    },
    OPTIONS {
        @Override
        public Response execute(RequestSpecification httpRequest, String apiUrl) {
            return httpRequest.options(apiUrl);
        }
    },
    PATCH {
        @Override
        public Response execute(RequestSpecification httpRequest, String apiUrl) {
            return httpRequest.patch(apiUrl);
        }
    };

    abstract public Response execute(RequestSpecification httpRequest, String apiUrl);
}
