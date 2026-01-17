'use client';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center gap-4 px-4">
        <SidebarTrigger />
        
        <div className="flex items-center gap-3 flex-1">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          
          {/* Title */}
          <h1 className="text-xl font-bold text-gray-900">
            Sahabat Usaha
          </h1>
        </div>

        {/* Beli Premium Button */}
        <Button
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold shadow-md"
          onClick={() => alert('Fitur Premium akan segera hadir!')}
        >
          ⭐ Beli Premium
        </Button>
      </div>
    </header>
  );
}

