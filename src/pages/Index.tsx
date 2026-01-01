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

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [settings, setSettings] = useState({
    pvp: { killaura: true, velocity: 50, reach: 3.5 },
    visual: { esp: true, tracers: false, xray: true },
    movement: { fly: false, speed: 100, nofall: true },
    auto: { autofarm: true, autoclicker: 12 }
  });

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
          
          <div className="hidden md:flex gap-6">
            {[
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'services', label: 'Услуги', icon: 'Settings' },
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
          </div>
          
          <Button className="md:hidden bg-primary text-black hover:bg-primary/90">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </nav>

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
                  Попробовать сейчас
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

            <section className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Sword', color: 'primary', title: 'PvP Модули', desc: 'KillAura, Velocity, AutoArmor и другие боевые функции' },
                { icon: 'Eye', color: 'secondary', title: 'Визуалы', desc: 'ESP, Tracers, XRay для полного обзора карты' },
                { icon: 'Zap', color: 'accent', title: 'Автоматизация', desc: 'AutoFarm, AutoMine, AutoClicker — играй на автопилоте' }
              ].map((feature, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover-lift">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-4`}>
                      <Icon name={feature.icon} size={32} className={`text-${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-8 border border-primary/20">
              <h3 className="text-3xl font-bold text-center mb-8">Почему выбирают Lirider?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: 'Shield', text: 'Обход античитов' },
                  { icon: 'Gauge', text: 'Высокая производительность' },
                  { icon: 'Puzzle', text: '100+ модулей' },
                  { icon: 'Users', text: '50K+ игроков' }
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
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-5xl font-bold text-primary text-glow">Настройки модулей</h2>
              <p className="text-xl text-gray-400">Настрой чит под свой стиль игры</p>
            </div>

            <Tabs defaultValue="pvp" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-card/50 p-1">
                <TabsTrigger value="pvp" className="data-[state=active]:bg-primary data-[state=active]:text-black">
                  <Icon name="Sword" size={18} className="mr-2" />
                  PvP
                </TabsTrigger>
                <TabsTrigger value="visual" className="data-[state=active]:bg-secondary data-[state=active]:text-white">
                  <Icon name="Eye" size={18} className="mr-2" />
                  Визуалы
                </TabsTrigger>
                <TabsTrigger value="movement" className="data-[state=active]:bg-accent data-[state=active]:text-black">
                  <Icon name="Move" size={18} className="mr-2" />
                  Движение
                </TabsTrigger>
                <TabsTrigger value="auto" className="data-[state=active]:bg-primary data-[state=active]:text-black">
                  <Icon name="Sparkles" size={18} className="mr-2" />
                  Авто
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pvp" className="space-y-6 mt-6">
                <Card className="bg-card/50 backdrop-blur border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Target" size={24} className="text-primary" />
                      KillAura
                    </CardTitle>
                    <CardDescription>Автоматическая атака врагов</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Включить</Label>
                      <Switch 
                        checked={settings.pvp.killaura}
                        onCheckedChange={(v) => updateSetting('pvp', 'killaura', v)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Дальность: {settings.pvp.reach}m</Label>
                      <Slider 
                        value={[settings.pvp.reach]} 
                        onValueChange={(v) => updateSetting('pvp', 'reach', v[0])}
                        min={3} 
                        max={6} 
                        step={0.1}
                        className="[&_[role=slider]]:bg-primary"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Wind" size={24} className="text-primary" />
                      Velocity
                    </CardTitle>
                    <CardDescription>Уменьшение отбрасывания</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Сила: {settings.pvp.velocity}%</Label>
                      <Slider 
                        value={[settings.pvp.velocity]} 
                        onValueChange={(v) => updateSetting('pvp', 'velocity', v[0])}
                        min={0} 
                        max={100} 
                        step={5}
                        className="[&_[role=slider]]:bg-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visual" className="space-y-6 mt-6">
                {[
                  { key: 'esp', title: 'ESP', desc: 'Подсветка игроков через стены', icon: 'Users' },
                  { key: 'tracers', title: 'Tracers', desc: 'Линии к игрокам', icon: 'GitBranch' },
                  { key: 'xray', title: 'XRay', desc: 'Видеть руды через блоки', icon: 'Gem' }
                ].map(item => (
                  <Card key={item.key} className="bg-card/50 backdrop-blur border-secondary/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name={item.icon} size={24} className="text-secondary" />
                        {item.title}
                      </CardTitle>
                      <CardDescription>{item.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Label>Включить</Label>
                        <Switch 
                          checked={settings.visual[item.key]}
                          onCheckedChange={(v) => updateSetting('visual', item.key, v)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="movement" className="space-y-6 mt-6">
                <Card className="bg-card/50 backdrop-blur border-accent/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Plane" size={24} className="text-accent" />
                      Fly
                    </CardTitle>
                    <CardDescription>Режим полёта</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Включить</Label>
                      <Switch 
                        checked={settings.movement.fly}
                        onCheckedChange={(v) => updateSetting('movement', 'fly', v)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-accent/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Gauge" size={24} className="text-accent" />
                      Speed
                    </CardTitle>
                    <CardDescription>Увеличение скорости</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Скорость: {settings.movement.speed}%</Label>
                      <Slider 
                        value={[settings.movement.speed]} 
                        onValueChange={(v) => updateSetting('movement', 'speed', v[0])}
                        min={100} 
                        max={300} 
                        step={10}
                        className="[&_[role=slider]]:bg-accent"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-accent/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Feather" size={24} className="text-accent" />
                      NoFall
                    </CardTitle>
                    <CardDescription>Отключение урона от падения</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Label>Включить</Label>
                      <Switch 
                        checked={settings.movement.nofall}
                        onCheckedChange={(v) => updateSetting('movement', 'nofall', v)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="auto" className="space-y-6 mt-6">
                <Card className="bg-card/50 backdrop-blur border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Pickaxe" size={24} className="text-primary" />
                      AutoFarm
                    </CardTitle>
                    <CardDescription>Автоматический сбор ресурсов</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Label>Включить</Label>
                      <Switch 
                        checked={settings.auto.autofarm}
                        onCheckedChange={(v) => updateSetting('auto', 'autofarm', v)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="MousePointer" size={24} className="text-primary" />
                      AutoClicker
                    </CardTitle>
                    <CardDescription>Автоматические клики</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>CPS: {settings.auto.autoclicker}</Label>
                      <Slider 
                        value={[settings.auto.autoclicker]} 
                        onValueChange={(v) => updateSetting('auto', 'autoclicker', v[0])}
                        min={1} 
                        max={20} 
                        step={1}
                        className="[&_[role=slider]]:bg-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center pt-8">
              <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold text-lg px-12 hover-lift">
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить настройки
              </Button>
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
                    { q: 'Как получить обновления?', a: 'Клиент автоматически проверяет обновления при запуске. Также следите за новостями в нашем Discord.' },
                    { q: 'Есть ли мобильная версия?', a: 'В данный момент мы работаем над версией для Bedrock Edition (мобильные устройства). Релиз планируется в Q2 2026.' }
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
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-5xl font-bold text-accent text-glow">Профиль</h2>
              <p className="text-xl text-gray-400">Управление аккаунтом и настройками</p>
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

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: 'Trophy', label: 'Побед', value: '1,247', color: 'primary' },
                { icon: 'Target', label: 'Убийств', value: '8,934', color: 'secondary' },
                { icon: 'Clock', label: 'Часов игры', value: '342', color: 'accent' }
              ].map((stat, i) => (
                <Card key={i} className={`bg-card/50 backdrop-blur border-${stat.color}/20 text-center`}>
                  <CardContent className="pt-6">
                    <Icon name={stat.icon} size={32} className={`text-${stat.color} mx-auto mb-2`} />
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card/50 backdrop-blur border-accent/30">
              <CardHeader>
                <CardTitle>Мои конфигурации</CardTitle>
                <CardDescription>Сохранённые наборы настроек</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Pvp Bypass', desc: 'Настройки для обхода Hypixel', icon: 'Sword' },
                  { name: 'Анархия', desc: 'Максимальные читы для анархии', icon: 'Flame' },
                  { name: 'Фарм', desc: 'Автоматизация для фарма', icon: 'Pickaxe' }
                ].map((config, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-background/30 rounded-lg hover:bg-background/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Icon name={config.icon} size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold">{config.name}</p>
                        <p className="text-sm text-gray-400">{config.desc}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-accent/30 hover:bg-accent/10">
                      Загрузить
                    </Button>
                  </div>
                ))}
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
                    <Label>Телеметрия</Label>
                    <p className="text-sm text-gray-400">Отправка анонимной статистики</p>
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
              <Button variant="destructive">
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
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
