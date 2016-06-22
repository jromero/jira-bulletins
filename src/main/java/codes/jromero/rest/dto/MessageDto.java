package codes.jromero.rest.dto;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "message")
public class MessageDto {

    @XmlElement(name = "message")
    private String message;

    public MessageDto() {}

    public MessageDto(String message) {
        this.message = message;
    }
}
