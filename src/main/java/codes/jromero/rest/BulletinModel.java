package codes.jromero.rest;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "bulletin")
@XmlAccessorType(XmlAccessType.FIELD)
public class BulletinModel {

    @XmlElement(name = "id")
    private int id;

    @XmlElement(name = "title")
    private String title;

    @XmlElement(name = "body")
    private String body;

    @XmlElement(name = "createdBy")
    private String createdBy;

    @XmlElement(name = "createdAt")
    private long createdAt;

    @XmlElement(name = "updatedAt")
    private long updatedAt;

    /**
     * WARNING: Should not be used manually
     */
    public BulletinModel() {}

    public BulletinModel(int id, String title, String body, String createdBy, long createdAt, long updatedAt) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
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
