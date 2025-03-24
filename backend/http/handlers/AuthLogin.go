package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/sefro/backgo/http/middlewares"
	"github.com/jserranojunior/sefro/backgo/models"
	"golang.org/x/crypto/bcrypt"
)

// AuthLogin a user controllers
func AuthLogin(c *gin.Context) {
	var user models.User
	c.Bind(&user)
	email := user.Email
	password := user.Password

	if email == "" || password == "" {
		c.JSON(401, gin.H{
			"message": "Erro ao tentar fazer login email ou senha em branco",
		})
	} else {
		var user models.User
		result := DB.Select("id", "password").Where("email = ?", email).First(&user)
		if result.RowsAffected == 0 {
			c.JSON(401, gin.H{
				"message": "Email ou senha incorretos",
			})
		} else {
			if compareBcrypt(user.Password, password) {
				user.Password = ""
				token := middlewares.GenerateJwt(user.ID)
				c.JSON(200, gin.H{
					"token": &token,
				})
			} else {
				c.JSON(401, gin.H{
				"message": "Email ou senha incorretos",
				})
			}
		}
	}
}

func compareBcrypt(hashedPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err == nil {
		return true
	} else {
		return false
	}
}
