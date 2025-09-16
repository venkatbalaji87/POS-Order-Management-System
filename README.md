# POS Order Management System (React + Vite)

A lightweight **offline-first Point of Sale (POS)** system built with React and Vite.  
Designed for food trucks and small businesses that need to keep working even with **spotty internet connectivity**.  

##  Features
- **Offline-first architecture** with IndexedDB for local storage  
- **Product Catalog** with search & add-to-cart  
- **Cart Management** with quantity controls and real-time totals  
- **Order Workflow**: place, sync, track status (pending → preparing → ready → completed)  
- **Print Queue Manager** for receipts & kitchen slips (ESC/POS ready)  
- **Realtime Updates** across devices using BroadcastChannel  
- **Responsive UI** for tablets and mobiles (touch + keyboard friendly)  
- **Persistent Cart** across reloads  



##   Project Structure
src/
 ├── components/       # UI components (Catalog, Cart, Header, Modal, etc.)
 ├── data/             # OfflineDataStore, PrintJobManager, SyncEngine, Realtime
 ├── hooks/            # usePersistentCart (cart persistence in IndexedDB)
 ├── App.jsx           # Main app
 ├── index.css         # Global styles
 └── main.jsx          # Entry point

---

## 📦 Installation

```bash
# Clone this repo
git clone https://github.com/venkatbalaji87/POS-Order-Management-System.git
cd POS-Order-Management-System

# Install dependencies
npm install

// To Check it in local
npm run dev