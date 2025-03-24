package main

import (
	"log"
	"os"
	"runtime"
	"fmt"

	"github.com/gocondor/core"
	"github.com/jserranojunior/sefro/backgo/config"
	"github.com/jserranojunior/sefro/backgo/http"
	"github.com/jserranojunior/sefro/backgo/http/authentication"
	"github.com/jserranojunior/sefro/backgo/http/handlers"
	"github.com/jserranojunior/sefro/backgo/http/middlewares"
	"github.com/joho/godotenv"
)

func main() {
	// New initializes new App variable
	app := core.New()

	// set env
	env, err := godotenv.Read(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	app.SetEnv(env)

	// set the app mode
	app.SetAppMode(os.Getenv("APP_MODE"))

	// What features to turn on or off
	app.SetEnabledFeatures(config.Features)

	// initialize core packages
	app.Bootstrap()

	// Register global middlewares
	middlewares.RegisterMiddlewares()

	//InitiateHandlersDependencies initiate handlers dependancies
	handlers.InitiateHandlersDependencies()

	// InitiateMiddlewaresDependencies initiate handlers dependancies
	middlewares.InitiateMiddlewaresDependencies()

	// Register routes
	http.RegisterRoutes()

	// Register Auth
	if config.Features.Authentication == true {
		// make sure the database flag is on
		if config.Features.Database == false {
			log.Fatal("authentication requires database feature to be on")
		}
		authentication.RegisterAuthRoutes()
	}

	// Run App
	app.Run(os.Getenv("APP_HTTP_PORT"))

	// Mantém a janela aberta (apenas para Windows)
	if runtime.GOOS == "windows" {
		log.Println("Pressione Enter para sair...")
		var input string
		fmt.Scanln(&input)
	}
}