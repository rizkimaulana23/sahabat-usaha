'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AdSense } from '@/components/adsense';

interface Device {
  id: string;
  name: string;
  watt: number;
  hoursPerDay: number;
  quantity: number;
}

const electricityRates: { [key: string]: number } = {
  'R1 - 900 VA': 1352,
  'R1 - 1300 VA': 1444.70,
  'R1 - 2200 VA': 1444.70,
  'R2 - 3500-5500 VA': 1699.53,
  'Bisnis': 1699.53,
};

export default function ListrikPage() {
  const [tariffGroup, setTariffGroup] = useState<string>('');
  const [deviceName, setDeviceName] = useState('');
  const [watt, setWatt] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [quantity, setQuantity] = useState('');
  const [devices, setDevices] = useState<Device[]>([]);
  const [totalCost, setTotalCost] = useState<number | null>(null);

  const handleAddDevice = () => {
    if (!deviceName || !watt || !hoursPerDay || !quantity) {
      alert('Mohon isi semua field!');
      return;
    }

    const newDevice: Device = {
      id: Date.now().toString(),
      name: deviceName,
      watt: parseFloat(watt),
      hoursPerDay: parseFloat(hoursPerDay),
      quantity: parseInt(quantity),
    };

    setDevices([...devices, newDevice]);
    
    // Reset form
    setDeviceName('');
    setWatt('');
    setHoursPerDay('');
    setQuantity('');
  };

  const handleCalculate = () => {
    if (!tariffGroup) {
      alert('Mohon pilih golongan tarif listrik!');
      return;
    }

    if (devices.length === 0) {
      alert('Mohon tambahkan minimal satu perangkat!');
      return;
    }

    // Hitung total konsumsi listrik per bulan
    let totalKwhPerMonth = 0;

    devices.forEach((device) => {
      // Konsumsi per hari dalam kWh
      const kwhPerDay = (device.watt * device.hoursPerDay * device.quantity) / 1000;
      // Konsumsi per bulan (30 hari)
      const kwhPerMonth = kwhPerDay * 30;
      totalKwhPerMonth += kwhPerMonth;
    });

    // Hitung biaya
    const ratePerKwh = electricityRates[tariffGroup];
    const cost = totalKwhPerMonth * ratePerKwh;

    setTotalCost(cost);
  };

  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6">Hitung Listrik</h1>

        {/* AdSense - Top */}
        <div className="w-full mb-6">
          <AdSense adSlot="8161451576" />
        </div>

        {/* Golongan Tarif Listrik */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Golongan Tarif Listrik</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={tariffGroup} onValueChange={setTariffGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Nama Perangkat" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(electricityRates).map((rate) => (
                  <SelectItem key={rate} value={rate}>
                    {rate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Masukkan Perangkat Anda */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Masukkan Perangkat Anda!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Nama Perangkat"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <Input
              placeholder="Daya (Watt)"
              type="number"
              value={watt}
              onChange={(e) => setWatt(e.target.value)}
            />
            <Input
              placeholder="Jam / hari"
              type="number"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
            />
            <Input
              placeholder="Banyak Perangkat"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Button
              className="w-full bg-gray-600 hover:bg-gray-700"
              onClick={handleAddDevice}
            >
              + Tambah Perangkat
            </Button>
          </CardContent>
        </Card>

        {/* Daftar Perangkat */}
        {devices.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center">Daftar Perangkat</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">No</TableHead>
                    <TableHead className="text-center">Nama Perangkat</TableHead>
                    <TableHead className="text-center">Watt</TableHead>
                    <TableHead className="text-center">Banyak Perangkat</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device, index) => (
                    <TableRow key={device.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">{device.name}</TableCell>
                      <TableCell className="text-center">{device.watt}</TableCell>
                      <TableCell className="text-center">{device.quantity}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteDevice(device.id)}
                        >
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Hitung Button */}
        <Button
          className="w-full bg-gray-600 hover:bg-gray-700 mb-6"
          onClick={handleCalculate}
        >
          Hitung
        </Button>

        {/* Hasil Perhitungan */}
        {totalCost !== null && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Estimasi Biaya Listrik per Bulan:</h3>
                <p className="text-3xl font-bold text-green-600">
                  Rp {totalCost.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AdSense - Bottom */}
        <div className="w-full mb-6">
          <AdSense adSlot="8161451576" />
        </div>

        {/* Hitung untuk Biaya per Produk */}
        <Button
          className="w-full bg-gray-600 hover:bg-gray-700"
          onClick={() => {
            // This would navigate to another page or show a modal
            alert('Fitur ini akan segera hadir!');
          }}
        >
          Hitung untuk Biaya per Produk
        </Button>
      </div>
    </div>
  );
}
