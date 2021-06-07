export const onResize = () => {
	document.body.style.setProperty(
		"--vh",
		`${document.documentElement.clientHeight / 100}px`
	)
}

export const themeSwitcherListener = () => {
	const button = document.getElementById("theme-switch")
	button.addEventListener("click", () => {
		const theme = JSON.parse(localStorage.getItem("darkTheme"))
		if (typeof theme === "boolean") {
			localStorage.setItem("darkTheme", !theme)
		} else {
			localStorage.setItem("darkTheme", true)
		}
		themeSwitcher(localStorage.getItem("darkTheme"))
	})
	themeSwitcher()
}

export const themeSwitcher = (theme = false) => {
	console.log(theme)
	document.body.setAttribute("data-theme", theme ? "dark" : "light")
}
