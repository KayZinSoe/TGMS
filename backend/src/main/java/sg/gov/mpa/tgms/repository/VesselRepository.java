package sg.gov.mpa.tgms.repository;
// import org.springframework.stereotype.Repository;
import sg.gov.mpa.tgms.entity.Vessel;
import java.util.Map;
import java.util.Optional;


// @Repository
public class VesselRepository {

    private final static Map<String, Vessel> vessels = Map.of(
        "1234567",
        new Vessel(
            "1234567",
            "Ocean Star",
            "Singapore",
            "ACTIVE"
        ),
        "7654321",
        new Vessel(
            "7654321",
            "Pacific Explorer",
            "Panama",
            "IN_PORT"
        )
    );

    public static Optional<Vessel> findByImoNumber(String imoNumber) {
        return Optional.ofNullable(vessels.get(imoNumber));
    }
}
