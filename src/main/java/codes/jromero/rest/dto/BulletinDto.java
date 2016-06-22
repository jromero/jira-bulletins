package codes.jromero.rest.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "bulletin")
public class BulletinDto {

    @XmlElement(name = "id")
    private int id;

    @XmlElement(name = "body")
    private String body;

    @XmlElement(name = "rendered")
    private String rendered;

    @XmlElement(name = "createdBy")
    private String createdBy;

    @XmlElement(name = "createdAt")
    private long createdAt;

    @XmlElement(name = "updatedAt")
    private long updatedAt;

    /**
     * WARNING: Should not be used manually
     */
    public BulletinDto() {}

    public BulletinDto(int id, String body, String rendered, String createdBy, long createdAt, long updatedAt) {
        this.id = id;
        this.body = body;
        this.rendered = rendered;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public int getId() {
        return id;
    }

    public String getBody() {
        return body;
    }

    public String getRendered() {
        return rendered;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public long getUpdatedAt() {
        return updatedAt;
    }
}
