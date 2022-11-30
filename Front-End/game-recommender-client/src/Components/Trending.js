import React from 'react';

const Trending = () => {
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-4xl font-bold">Trending</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div
            className="bg-cover bg-center h-56 p-4"
            style={{
              backgroundImage:
                "url('https://images.igdb.com/igdb/image/upload/t_cover_big/co1q0m.jpg')",
            }}
          ></div>
          <div className="p-4">
            <h1 className="text-gray-900 font-bold uppercase">
              The Legend of Zelda: Breath of the Wild
            </h1>
            <p className="mt-1 text-gray-600">
              The Legend of Zelda: Breath of the Wild is an
              action-adventure game developed and published by
              Nintendo for the Nintendo Switch and Wii U video game
              consoles. Set in the fantasy land of Hyrule, the game
              follows a
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
