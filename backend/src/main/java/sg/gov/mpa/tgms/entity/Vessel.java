package sg.gov.mpa.tgms.entity;

public class Vessel {

    private String imoNumber;
    private String name;
    private String flag;
    private String status;

    public Vessel(String imoNumber, String name, String flag, String status) {
        this.imoNumber = imoNumber;
        this.name = name;
        this.flag = flag;
        this.status = status;
    }

    public String getImoNumber() {
        return imoNumber;
    }

    public String getName() {
        return name;
    }

    public String getFlag() {
        return flag;
    }

    public String getStatus() {
        return status;
    }
}
