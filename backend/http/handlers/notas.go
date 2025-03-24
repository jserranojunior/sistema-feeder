package handlers

import (
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Nota struct {
    gorm.Model
    ID          uint   `gorm:"not null;" json:"route_id"`
    NumeroNota  string `gorm:"not null;" json:"numero_nota"`
    CaminhoNota string `gorm:"not null;" json:"caminho_nota"`
    FotoNota    string `gorm:"not null;" json:"foto_nota"`
}

func SaveNota(c *gin.Context) {
    // Obtenha os dados do formulário
    numeroNota := c.PostForm("numero_nota")
    caminhoBase := c.PostForm("caminho_nota")
    fotoNota, err := c.FormFile("foto_nota")

    // Verifique se o arquivo da foto foi enviado
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Erro ao obter o arquivo da foto",
        })
        return
    }

    // Crie o caminho completo para a pasta da nota
    pastaNota := filepath.Join(caminhoBase, numeroNota)

    // Verifique se a pasta da nota existe, caso contrário, crie o diretório
    if _, err := os.Stat(pastaNota); os.IsNotExist(err) {
        err = os.MkdirAll(pastaNota, os.ModePerm) // Cria a pasta com permissões padrão
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": "Erro ao criar a pasta da nota",
            })
            return
        }
    }

    // Defina o caminho completo onde o arquivo será salvo
    caminhoCompleto := filepath.Join(pastaNota, fotoNota.Filename)

    // Salve o arquivo no caminho especificado
    if err := c.SaveUploadedFile(fotoNota, caminhoCompleto); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Erro ao salvar o arquivo",
        })
        return
    }

    // Retorne uma resposta de sucesso
    c.JSON(http.StatusOK, gin.H{
        "message":       "Nota salva com sucesso",
        "numero_nota":   numeroNota,
        "caminho_salvo": caminhoCompleto,
    })
}