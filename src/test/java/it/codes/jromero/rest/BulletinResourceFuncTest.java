package it.codes.jromero.rest;

import org.junit.Test;
import org.junit.After;
import org.junit.Before;

import org.apache.wink.client.Resource;
import org.apache.wink.client.RestClient;

public class BulletinResourceFuncTest {

    @Before
    public void setup() {

    }

    @After
    public void tearDown() {

    }

    @Test
    public void messageIsValid() {

        String baseUrl = System.getProperty("baseurl");
        String resourceUrl = baseUrl + "/rest/bulletin/1.0/message";

        RestClient client = new RestClient();
        Resource resource = client.resource(resourceUrl);
//
//        BulletinResourceModel message = resource.get(BulletinResourceModel.class);
//
//        assertEquals("wrong message", "Hello Worlds", message.getMessage());
    }
}
