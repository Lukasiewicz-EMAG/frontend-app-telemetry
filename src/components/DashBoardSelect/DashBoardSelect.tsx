import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Database, Calculator } from "lucide-react";
import Header from '@edx/frontend-component-header';
import FooterSlot from '@openedx/frontend-slot-footer';

export default function EnhancedSelectionPageWithImages() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-1 border-b bg-background px-4 w-full">
                <Header />
            </div>
            <main className="flex-1 overflow-auto p-4">
                <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
                    <header className="py-8 px-4 text-center">
                        <h1 className="text-4xl font-bold text-primary mb-2">Witamy w Centrum Nauki</h1>
                        <p className="text-xl text-muted-foreground">Wybierz obszar zainteresowań, aby rozpocząć</p>
                    </header>

                    <main className="container mx-auto px-4 pb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card
                                className="group relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                                onClick={() => navigate('?page=inf')}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src="/src/assets/img.svg"
                                        alt="Okładka kursu Informatyka"
                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                                </div>
                                <CardContent className="p-6 flex flex-col items-center justify-center relative">
                                    <div className="absolute -top-8 bg-background rounded-full p-2 shadow-md">
                                        <Database className="w-10 h-10 text-primary" />
                                    </div>
                                    <h2 className="mt-8 text-2xl font-bold text-center">Panel Informatyki</h2>
                                    <p className="mt-2 text-center text-muted-foreground">
                                        Eksploruj struktury danych, algorytmy i pojęcia obliczeniowe
                                    </p>
                                </CardContent>
                            </Card>

                            <Card
                                className="group relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                                onClick={() => navigate('?page=math')}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src="/src/assets/img.svg"
                                        alt="Okładka kursu Matematyka"
                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                                </div>
                                <CardContent className="p-6 flex flex-col items-center justify-center relative">
                                    <div className="absolute -top-8 bg-background rounded-full p-2 shadow-md">
                                        <Calculator className="w-10 h-10 text-primary" />
                                    </div>
                                    <h2 className="mt-8 text-2xl font-bold text-center">Panel Matematyki</h2>
                                    <p className="mt-2 text-center text-muted-foreground">
                                        Zgłębiaj pojęcia matematyczne, wzory i rozwiązywanie problemów
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </main>
            <div className="flex justify-end border-t">
                <FooterSlot />
            </div>
        </div>
    );
}
