package codes.jromero.ao;

import net.java.ao.Entity;

public interface BulletinPdo extends Entity {

    String getProjectKey();

    void setProjectKey(String projectKey);

    String getBody();

    void setBody(String body);

    String getCreatedBy();

    void setCreatedBy(String createdBy);

    long getCreatedAt();

    void setCreatedAt(long createdAtMs);

    long getUpdatedAt();

    void setUpdatedAt(long updatedAtMs);
}
