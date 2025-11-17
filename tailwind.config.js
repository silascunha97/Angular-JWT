// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // Adicione suas extensões de tema aqui
    },
  },
  // ⭐️ Adicione o daisyUI como um plugin aqui:
  plugins: [
    require('daisyui'),
  ],

  // ⚙️ Opcional: Configuração customizada do daisyUI
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Liste os temas que você deseja usar
    darkTheme: "dark", // Tema padrão para o modo escuro
    base: true, // Adiciona estilos base do daisyUI
    styled: true, // Adiciona estilos padrão aos componentes
    utils: true, // Adiciona classes utilitárias
    prefix: "", // prefixo para classes daisyUI (vazio por padrão)
    logs: true, // Mostra logs de status
    themeRoot: ":root", // Onde aplicar as variáveis CSS dos temas
  },
}