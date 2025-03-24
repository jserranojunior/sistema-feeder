// Copyright 2021 Harran Ali <harran.m@gmail.com>. All rights reserved.
// Use of this source code is governed by MIT-style
// license that can be found in the LICENSE file.

package http

import (
	"github.com/gocondor/core/routing"
	"github.com/jserranojunior/sefro/backgo/http/handlers"
	"github.com/jserranojunior/sefro/backgo/http/middlewares"

    "github.com/gin-gonic/gin"
)

// RegisterRoutes to register your routes
func RegisterRoutes() {
	router := routing.Resolve()

	//Define your routes here
	router.Post("/user", middlewares.CORSMiddleware, handlers.UserCreate)
	router.Get("/user", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.GetUser)
	router.Get("/", func(c *gin.Context) {
        c.File("upload.html") // Serve o arquivo HTML
    })
	router.Post("/login", middlewares.CORSMiddleware, handlers.AuthLogin)

	
	// financial.Use(middlewares.VerifyJwt, middlewares.CORSMiddleware())
	
		router.Post("/notas", middlewares.CORSMiddleware, handlers.SaveNota)

	

}
