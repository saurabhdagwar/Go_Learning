package maps

import "fmt"

func Maps() {
	website := map[string]string{
		"google":              "https://google.com",
		"Amazon Web Services": "https://aws.com",
	}
	fmt.Println(website["google"])
	website["Linkedin"] = "https://linkedin.com"
	fmt.Println(website)
	delete(website, "google")
	fmt.Println(website)
}
