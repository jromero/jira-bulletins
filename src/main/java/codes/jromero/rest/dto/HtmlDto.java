package codes.jromero.rest.dto;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "html")
@XmlAccessorType(XmlAccessType.FIELD)
public class HtmlDto {

    private String html;

    /**
     * WARNING: Should not be used manually
     */
    public HtmlDto() {}

    public HtmlDto(String html) {
        this.html = html;
    }

    public String getHtml() {
        return html;
    }
}
