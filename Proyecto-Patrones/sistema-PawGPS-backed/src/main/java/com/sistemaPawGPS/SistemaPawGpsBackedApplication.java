package com.sistemaPawGPS;

import com.sistemaPawGPS.entidades.Rol;
import com.sistemaPawGPS.entidades.Usuario;
import com.sistemaPawGPS.entidades.UsuarioRol;
import com.sistemaPawGPS.servicios.impl.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class SistemaPawGpsBackedApplication implements CommandLineRunner {

	@Autowired
	private UsuarioServiceImpl usuarioService;

	public static void main(String[] args) {
		SpringApplication.run(SistemaPawGpsBackedApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		/*
		Usuario usuario = new Usuario();
		usuario.setNombre("Dirkinm Ojeda");
		usuario.setApellido("Rodriguez");
		usuario.setUsername("Dirkin");
		usuario.setPassword("<3127413304>");
		usuario.setEmail("dirkinojedarodriguez@gmail.com");
		usuario.setTelefono("3212374663");
		usuario.setPerfil("foto.png");

		Rol rol = new Rol();
		rol.setRolId(1l);
		rol.setNombre("ADMIN");

		Set<UsuarioRol> usuarioRoles = new HashSet<>();
		UsuarioRol usuarioRol = new UsuarioRol();
		usuarioRol.setRol(rol);
		usuarioRol.setUsuario(usuario);
		usuarioRoles.add(usuarioRol);

		Usuario usuarioGuardado = usuarioService.guardarUsuario(usuario, usuarioRoles);
		System.out.println(usuarioGuardado.getUsername());*/

	}

}


