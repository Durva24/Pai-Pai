# 💰 Pai-Pai (पै-पै) – Penny by Penny

**Your personal finance whisperer, one spreadsheet at a time.**  
**Built with Next.js, love, and a mild obsession with budgets.**

---

## 🧾 What is Pai-Pai?

*Pai-Pai* is a minimalist, personal-level finance tracker designed to extract and visualize the juice from your Excel spreadsheets — making sense of every rupee, dollar, euro (or heck, bottle cap) you spend or save. Whether you're budgeting for coffee or crypto, Pai-Pai helps you **track, analyze, and breathe easy**.

---

## ✨ Features

- 📊 **Dashboard View**: Get a clean overview of your money moves.
- 🧾 **Excel Sheet Parsing**: Upload Excel sheets and let Pai-Pai do the heavy lifting.
- 📈 **Charts and Graphs**: Income vs Expenses, Portfolio performance, and more.
- 🚀 **Investment & Debt Trackers**: Know where you stand and where you’re headed.
- 💡 **Milestone Tracking**: Visualize goals — emergency fund, retirement, or that vacation in Bali.
- 📌 **Daily Finance Quote**: Because a little inspiration goes a long way.

---

## 📂 Project Structure

```
Pai-Pai/
│
├── app/
│   ├── page.tsx                # Home/dashboard
│   └── api/
│       └── form-handler.ts     # Single API function to handle uploads/processing
│
├── components/
│   ├── form/
│   │   └── Form.tsx            # Upload Excel and submit
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Chart.tsx           # Chart rendering components
│   └── dashboard/
│       ├── Overview.tsx
│       ├── IncomeVsExpenses.tsx
│       ├── EmergencyFund.tsx
│       ├── InvestmentAllocation.tsx
│       ├── Milestones.tsx
│       ├── PortfolioPerformance.tsx
│       ├── DebtTracker.tsx
│       └── Quote.tsx
│
├── lib/
│   └── groqClient.ts           # Groq query setup (optional data pipeline)
│
├── styles/
│   └── globals.css             # White aesthetic, good for the eyes
│
└── README.md                   # You're reading it!
```

---

## 🛠 Tech Stack

- **Next.js** – for fast, sleek frontend routing and rendering
- **TypeScript** – because we like things typed and tight
- **Excel File Parsing** – via `xlsx` or a similar library
- **Tailwind CSS** – to keep it clean and breezy
- **Groq (Optional)** – experimental data querying
- **Chart.js / Recharts** – for all the beautiful graphs you deserve

---

## 🧑‍💻 Getting Started

1. **Clone it:**
   ```bash
   git clone https://github.com/yourusername/pai-pai.git
   cd pai-pai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the dev server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 📈 How to Use

1. Upload your Excel finance sheet in the dashboard.
2. Watch the components light up with insights: income vs expenses, debt, investments, and more.
3. Add milestones and track progress.
4. Feel like a finance wizard ✨.

---

## 🚧 Roadmap

- [ ] Multi-user support
- [ ] Google Sheets integration
- [ ] AI insights and budgeting suggestions
- [ ] Data export and report generation

---

## 🤝 Contributing

PRs welcome. If you have ideas, bug reports, or Excel sheet rants — open an issue or ping me.

---

## 📜 License

MIT — _May all your cents make sense._

---
