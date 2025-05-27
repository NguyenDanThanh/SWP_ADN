package swp.project.adn_backend.exception;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import swp.project.adn_backend.enums.RegisterErrorCode;

@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppException extends  RuntimeException{
    RegisterErrorCode errorCode;

    public AppException(RegisterErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public RegisterErrorCode getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(RegisterErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
