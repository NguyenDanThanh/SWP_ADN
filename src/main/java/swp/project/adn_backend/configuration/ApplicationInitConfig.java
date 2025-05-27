//package swp.project.adn_backend.configuration;
//
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import swp.project.adn_backend.entity.Users;
//import swp.project.adn_backend.enums.Roles;
//import swp.project.adn_backend.repository.UserRepository;
//
//import java.util.HashSet;
//
//@Configuration
//public class ApplicationInitConfig {
//    @Bean
//    ApplicationRunner applicationRunner(UserRepository userRepository) {
//        return args -> {
//            if (userRepository.findByUsername("adminAccount").isEmpty()){
//                var roles=new HashSet<String>();
//                roles.add(Roles.ADMIN.name());
//                Users users=new Users().builder()
//                        .username("adminAccount")
//                        .roles(roles)
//                        .build();
//            }
//        }
//    }
//}
