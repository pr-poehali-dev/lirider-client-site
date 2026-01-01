import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [cart, setCart] = useState<Array<{id: string, name: string, price: number}>>([]);
  const [showCart, setShowCart] = useState(false);
  const [settings, setSettings] = useState({
    pvp: { killaura: true, velocity: 50, reach: 3.5 },
    visual: { esp: true, tracers: false, xray: true },
    movement: { fly: false, speed: 100, nofall: true },
    auto: { autofarm: true, autoclicker: 12 }
  });

  const products = [
    { id: '1month', name: '1 месяц', price: 200, desc: 'Доступ на 30 дней', icon: 'Calendar', popular: false },
    { id: '3months', name: '3 месяца', price: 450, desc: 'Доступ на 90 дней', icon: 'CalendarRange', popular: true },
    { id: 'lifetime', name: 'Навсегда', price: 600, desc: 'Безлимитный доступ', icon: 'Infinity', popular: false },
    { id: 'beta', name: 'Beta доступ', price: 700, desc: 'Эксклюзивные функции', icon: 'Sparkles', popular: false }
  ];

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => [...prev, { id: product.id, name: product.name, price: product.price }]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], [key]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <nav className="border-b border-primary/20 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary pixel-corners flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h1 className="text-2xl font-bold text-primary text-glow">LIRIDER CLIENT</h1>
          </div>
          
          <div className="hidden md:flex gap-6 items-center">
            {[
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'services', label: 'Услуги', icon: 'ShoppingBag' },
              { id: 'support', label: 'Поддержка', icon: 'MessageCircle' },
              { id: 'profile', label: 'Профиль', icon: 'User' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all hover-lift ${
                  activeSection === item.id
                    ? 'bg-primary text-black font-semibold'
                    : 'text-gray-300 hover:text-primary hover:bg-primary/10'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
            
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative px-4 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-md transition-all"
            >
              <Icon name="ShoppingCart" size={20} className="text-secondary" />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-accent text-black px-2 py-0.5">
                  {cart.length}
                </Badge>
              )}
            </button>
          </div>
          
          <Button className="md:hidden bg-primary text-black hover:bg-primary/90">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </nav>

      {showCart && (
        <div className="fixed right-4 top-20 w-96 bg-card border border-primary/30 rounded-lg shadow-2xl z-50 animate-fade-in">
          <div className="p-4 border-b border-primary/20">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Корзина</h3>
              <button onClick={() => setShowCart(false)}>
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Корзина пуста</p>
            ) : (
              <>
                {cart.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-primary">{item.price} ₽</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(i)}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                ))}
                <div className="border-t border-primary/20 pt-3 mt-3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg">Итого:</span>
                    <span className="font-bold text-2xl text-primary">{cartTotal} ₽</span>
                  </div>
                  <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold">
                    <Icon name="CreditCard" size={18} className="mr-2" />
                    Оплатить
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center space-y-6 py-12">
              <div className="inline-block">
                <h2 className="text-6xl md:text-8xl font-black text-primary text-glow mb-4">
                  LIRIDER
                </h2>
                <div className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Самый мощный чит-клиент для Minecraft. Полный контроль игры в твоих руках.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  size="lg" 
                  className="bg-primary text-black hover:bg-primary/90 font-bold text-lg px-8 hover-lift"
                  onClick={() => setActiveSection('services')}
                >
                  <Icon name="Zap" size={20} className="mr-2" />
                  Купить сейчас
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-secondary text-secondary hover:bg-secondary/10 font-bold text-lg px-8 hover-lift"
                >
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать v2.4
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: 'MessageSquare', color: 'primary', title: 'Discord', desc: 'Присоединяйся к нашему сообществу', link: 'https://discord.gg/MmHMg7vtcv' },
                { icon: 'Send', color: 'secondary', title: 'Telegram', desc: 'Новости и обновления в Telegram', link: 'https://t.me/liriderclient' }
              ].map((feature, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover-lift cursor-pointer" onClick={() => window.open(feature.link, '_blank')}>
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-4`}>
                      <Icon name={feature.icon} size={32} className={`text-${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">{feature.desc}</CardDescription>
                    <Button className="w-full bg-primary/20 hover:bg-primary/30 border border-primary/30">
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      Перейти
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-8 border border-primary/20">
              <h3 className="text-3xl font-bold text-center mb-8">Почему выбирают Lirider?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: 'Shield', text: 'Лучшие обходы' },
                  { icon: 'Zap', text: 'Оптимизация чита' },
                  { icon: 'Grid3x3', text: '30+ модулей' },
                  { icon: 'Users', text: '10+ игроков' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name={item.icon} size={24} className="text-primary" />
                    </div>
                    <span className="text-lg font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'services' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-primary text-glow">Тарифы и услуги</h2>
              <p className="text-xl text-gray-400">Выберите подходящий тариф доступа</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <Card 
                  key={product.id} 
                  className={`bg-card/50 backdrop-blur border-primary/30 hover:border-primary transition-all hover-lift relative ${
                    product.popular ? 'ring-2 ring-secondary' : ''
                  }`}
                >
                  {product.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-secondary text-white px-4 py-1">Популярный</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={product.icon} size={40} className="text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
                    <div className="text-4xl font-black text-primary mb-2">
                      {product.price} ₽
                    </div>
                    <CardDescription className="text-base">{product.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-primary" />
                        <span>Все модули</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-primary" />
                        <span>Обход античитов</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-primary" />
                        <span>Обновления</span>
                      </li>
                      {product.id === 'beta' && (
                        <li className="flex items-center gap-2">
                          <Icon name="Sparkles" size={16} className="text-accent" />
                          <span>Ранний доступ</span>
                        </li>
                      )}
                    </ul>
                    <Button 
                      className="w-full bg-primary text-black hover:bg-primary/90 font-semibold"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Добавить в корзину
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>


          </div>
        )}

        {activeSection === 'support' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-5xl font-bold text-secondary text-glow">Техподдержка</h2>
              <p className="text-xl text-gray-400">Мы поможем решить любую проблему</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { icon: 'MessageSquare', label: 'Discord', value: 'lirider.gg/discord' },
                { icon: 'Mail', label: 'Email', value: 'support@lirider.gg' },
                { icon: 'Send', label: 'Telegram', value: '@lirider_support' }
              ].map((contact, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur border-secondary/20 hover:border-secondary/50 transition-all hover-lift text-center">
                  <CardContent className="pt-6">
                    <Icon name={contact.icon} size={32} className="text-secondary mx-auto mb-3" />
                    <p className="font-semibold mb-1">{contact.label}</p>
                    <p className="text-sm text-gray-400">{contact.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card/50 backdrop-blur border-secondary/30">
              <CardHeader>
                <CardTitle className="text-2xl">Часто задаваемые вопросы</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    { q: 'Как установить клиент?', a: 'Скачайте файл установки, запустите его и следуйте инструкциям. После установки запустите Minecraft через наш лаунчер.' },
                    { q: 'Безопасен ли Lirider?', a: 'Да, наш клиент использует передовые технологии обхода античитов. Мы регулярно обновляем систему защиты.' },
                    { q: 'На каких версиях работает?', a: 'Lirider поддерживает версии от 1.8 до 1.20.4. Новые версии добавляются в течение недели после релиза.' },
                    { q: 'Как получить обновления?', a: 'Клиент автоматически проверяет обновления при запуске. Также следите за новостями в нашем Discord.' }
                  ].map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left hover:text-secondary">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-secondary/30">
              <CardHeader>
                <CardTitle className="text-2xl">Форма обратной связи</CardTitle>
                <CardDescription>Опишите вашу проблему, и мы свяжемся с вами</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Ваше имя</Label>
                  <Input placeholder="Введите имя" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label>Email или Discord</Label>
                  <Input placeholder="example@mail.com или Username#1234" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label>Тема обращения</Label>
                  <Input placeholder="Краткое описание проблемы" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label>Подробное описание</Label>
                  <Textarea 
                    placeholder="Опишите проблему максимально подробно..."
                    className="bg-background/50 min-h-32"
                  />
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90 font-semibold">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить обращение
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {!isAuthenticated ? (
              <>
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-5xl font-bold text-accent text-glow">
                    {authMode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
                  </h2>
                  <p className="text-xl text-gray-400">
                    {authMode === 'login' 
                      ? 'Войдите для доступа к профилю' 
                      : 'Создайте аккаунт для покупки клиента'
                    }
                  </p>
                </div>

                <Card className="bg-card/50 backdrop-blur border-accent/30 max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">
                      {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="bg-background/50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Пароль</Label>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-background/50" 
                      />
                    </div>
                    {authMode === 'register' && (
                      <div className="space-y-2">
                        <Label>Подтверждение пароля</Label>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="bg-background/50" 
                        />
                      </div>
                    )}
                    <Button 
                      className="w-full bg-accent text-black hover:bg-accent/90 font-bold"
                      onClick={() => setIsAuthenticated(true)}
                    >
                      {authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
                    </Button>
                    <div className="text-center">
                      <button 
                        onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                        className="text-sm text-accent hover:underline"
                      >
                        {authMode === 'login' 
                          ? 'Нет аккаунта? Зарегистрироваться' 
                          : 'Уже есть аккаунт? Войти'
                        }
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-5xl font-bold text-accent text-glow">Профиль</h2>
                  <p className="text-xl text-gray-400">Управление аккаунтом</p>
                </div>

                <Card className="bg-card/50 backdrop-blur border-accent/30">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center text-4xl">
                        🎮
                      </div>
                      <div>
                        <CardTitle className="text-2xl">ProGamer2025</CardTitle>
                        <CardDescription className="text-base">Премиум подписка до: 15.03.2026</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-accent/20">
                  <CardHeader>
                    <CardTitle>HWID</CardTitle>
                    <CardDescription>Уникальный идентификатор устройства</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 p-4 bg-background/30 rounded-lg font-mono text-sm">
                      <Icon name="Fingerprint" size={24} className="text-accent" />
                      <code className="flex-1">A4B2-C8D9-E3F1-5G7H-9I0J</code>
                      <Button size="sm" variant="outline" className="border-accent/30">
                        <Icon name="Copy" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-accent/30">
                  <CardHeader>
                    <CardTitle>Скачать клиент</CardTitle>
                    <CardDescription>Последняя версия: v2.4.1</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-primary text-black hover:bg-primary/90 font-semibold">
                      <Icon name="Download" size={18} className="mr-2" />
                      Скачать для Windows
                    </Button>
                    <Button variant="outline" className="w-full border-accent/30">
                      <Icon name="Download" size={18} className="mr-2" />
                      Скачать для macOS
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-accent/30">
                  <CardHeader>
                    <CardTitle>Настройки аккаунта</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Автообновление клиента</Label>
                        <p className="text-sm text-gray-400">Скачивать новые версии автоматически</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Уведомления</Label>
                        <p className="text-sm text-gray-400">Получать новости и обновления</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4 justify-center">
                  <Button variant="outline" className="border-accent/30 hover:bg-accent/10">
                    <Icon name="Settings" size={18} className="mr-2" />
                    Дополнительные настройки
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => setIsAuthenticated(false)}
                  >
                    <Icon name="LogOut" size={18} className="mr-2" />
                    Выйти
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-primary/20 bg-slate-950/80 backdrop-blur-lg mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-primary mb-3">LIRIDER CLIENT</h3>
              <p className="text-sm text-gray-400">Самый продвинутый чит-клиент для Minecraft</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Продукт</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Возможности</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Скачать</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Обновления</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Правовая информация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Условия использования</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-6 text-center text-sm text-gray-400">
            © 2026 Lirider Client. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}