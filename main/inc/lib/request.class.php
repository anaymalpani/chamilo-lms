<?php

/**
 * Provides access to various HTTP request elements: GET, POST, FILE, etc paramaters.
 
 * @license see /license.txt
 * @author Laurent Opprecht <laurent@opprecht.info> for the Univesity of Geneva
 */
class Request
{

    public static function get($key, $default = null)
    {
        return isset($_GET[$key]) ? isset($_GET[$key]) : $default;
    }
    
    public static function post($key, $default = null)
    {
        return isset($_POST[$key]) ? isset($_POST[$key]) : $default;
    }
   
    static function server($key, $default = null)
    {
        return isset($_SERVER[$key]) ? isset($_SERVER[$key]) : $default;
    }

    static function file($key, $default = null)
    {
        return isset($_FILES[$key]) ? isset($_FILES[$key]) : $default;
    }

    static function environment($key, $default = null)
    {
        return isset($_ENV[$key]) ? isset($_ENV[$key]) : $default;
    }

}