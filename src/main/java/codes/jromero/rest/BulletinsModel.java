package codes.jromero.rest;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Collection;

@XmlRootElement(name = "bulletins")
@XmlAccessorType(XmlAccessType.FIELD)
public class BulletinsModel {

    @XmlElement(name = "count")
    private int count;

    @XmlElement(name = "totalCount")
    private int totalCount;

    @XmlElement(name = "bulletins")
    private Collection<BulletinModel> bulletins;

    /**
     * WARNING: Should not be used manually
     */
    public BulletinsModel() {}

    public BulletinsModel(int totalCount, Collection<BulletinModel> bulletins) {
        this.count = bulletins.size();
        this.totalCount = totalCount;
        this.bulletins = bulletins;
    }
}
