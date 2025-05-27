package swp.project.adn_backend.components;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtKeyProvider {

    @Value("${jwt.signer-key}")
    private String signerKey;

    public String getSignerKey() {
        return signerKey;
    }

    public JwtKeyProvider() {

    }

    public JwtKeyProvider(String signerKey) {
        this.signerKey = signerKey;
    }
}
