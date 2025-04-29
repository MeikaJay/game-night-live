<GlobalLayoutWrapper>
  <div className="flex flex-col flex-1 bg-gray-100 w-full overflow-auto">
    <header className="p-4 text-center bg-white shadow">
      <h1 className="text-2xl font-bold">Game Night Wheel</h1>
    </header>

    <main className="flex flex-1 items-center justify-center p-8 space-x-8">
      {/* 500×500 canvas */}
      <canvas/>

      {/* TWO‐COLUMN LIST */}
      <div className="flex space-x-4 h-[500px]">
        <ul className="w-32 bg-white p-2 overflow-auto space-y-1">
          {leftGames.map(g => <li key={g}>• {g}</li>)}
        </ul>
        <ul className="w-32 bg-white p-2 overflow-auto space-y-1">
          {rightGames.map(g => <li key={g}>• {g}</li>)}
        </ul>
      </div>
    </main>

    <footer className="p-4 flex justify-center space-x-4 bg-white">
      {/* buttons */}
    </footer>
  </div>
</GlobalLayoutWrapper>
