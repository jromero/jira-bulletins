package codes.jromero.rest;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "message")
public class MessageModel {

    @XmlElement(name = "message")
    private String message;

    public MessageModel() {}

    public MessageModel(String message) {
        this.message = message;
    }
}
