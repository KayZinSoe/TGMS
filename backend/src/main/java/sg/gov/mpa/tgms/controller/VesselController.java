package sg.gov.mpa.tgms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sg.gov.mpa.tgms.entity.Vessel;
import sg.gov.mpa.tgms.repository.VesselRepository;
import java.util.Map;


@RestController
@RequestMapping("/api/vessels")
public class VesselController {

    @GetMapping("/{imoNumber}")
    public ResponseEntity<Vessel> getVessel(@PathVariable String imoNumber) {
        return VesselRepository.findByImoNumber(imoNumber)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
