/* ************************************************************************** */
/* ************************************************************************** */
/* *************************** JwtTokenUtil.java **************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : JwtTokenUtil.java                                              */
/* ************************************************************************** */
/*  Creation Date : Feb 27, 2024, 1:12:11 PM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 27, 2024, 1:12:11 PM                                  */
/* ************************************************************************** */
/*  Created by : Mad <coding>                                                 */
/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*                                                                            */
/*                    :::::   ::::::            ::::::::           :::::::    */
/*                  :+:   :+:+     +:+        :+:     :+:        :+:    :+:   */
/*                #:#     +:+     +:+       +:+      +:+       +:+       :+:  */
/*              +#+      #+#     +:+      +:+:+:+:+:+:+      +:+        :+:   */
/*            +#+       #:#     #+#     #+#        :+:     +:+         :+:    */
/*          +#+        #+#     #:#    +#+         #:#    #+#          :+:     */
/*        ###         ###     ###   ###          ###   #############.fr       */
/*                                                                            */
/* ************************************************************************** */

package com.exercices.ten;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.io.Serializable;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil implements Serializable {
    private static final long serialVersionUID = 1L;
    
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    
//    @Value("${jwt.secret}")
//    private String secret;
    
    private static SecretKey key = Jwts.SIG.HS512.key().build();
    
    //    Retreive username from jwt token
    public String getUsernameFromToken(String token) throws NoSuchAlgorithmException, InvalidKeyException, InvalidKeySpecException {
        return getClaimFromToken(token, Claims::getSubject);
    }
    
    //    Retreive axpiration date from jwt token
    public Date getExpirationDateFromToken(String token) throws NoSuchAlgorithmException, InvalidKeyException, InvalidKeySpecException {
        return getClaimFromToken(token, Claims::getExpiration);
    }
    
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) throws NoSuchAlgorithmException, InvalidKeyException, InvalidKeySpecException {
            final Claims claims = getAllClaimsFromToken(token);
            return claimsResolver.apply(claims);
    }
    
    //for retrieveing any information from token we will need the secret key
    private Claims getAllClaimsFromToken(String token) throws NoSuchAlgorithmException, InvalidKeyException, InvalidKeySpecException {
        return Jwts.parser().verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
    
    //check if the token has expired
    private Boolean isTokenExpired(String token) throws NoSuchAlgorithmException, InvalidKeyException, InvalidKeySpecException {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }	
    //generate token for user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }
    
    //while creating the token -
    //1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
    //2. Sign the JWT using the HS512 algorithm and secret key.
    //3. According to JWS Compact Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
    //   compaction of the JWT to a URL-safe string 
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().claims(claims).subject(subject).issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
            .signWith(key).compact();
    }
    
    //validate token
    public Boolean validateToken(String token, UserDetails userDetails) throws NoSuchAlgorithmException, InvalidKeyException, InvalidKeySpecException {
            final String username = getUsernameFromToken(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}

/* ************************************************************************** */
/* *************************** JWTTOKENUTIL.JAVA **************************** */
/* ************************************************************************** */
