package codes.jromero.rest.dto;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Collection;

@XmlRootElement(name = "bulletins")
@XmlAccessorType(XmlAccessType.FIELD)
public class BulletinsDto {

    @XmlElement(name = "count")
    private int count;

    @XmlElement(name = "totalCount")
    private int totalCount;

    @XmlElement(name = "bulletins")
    private Collection<BulletinDto> bulletins;

    /**
     * WARNING: Should not be used manually
     */
    public BulletinsDto() {}

    public BulletinsDto(int totalCount, Collection<BulletinDto> bulletins) {
        this.count = bulletins.size();
        this.totalCount = totalCount;
        this.bulletins = bulletins;
    }
}
