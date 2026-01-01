import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Promo {
  id: string;
  code: string;
  discount: number;
  active: boolean;
}

interface Subscription {
  id: string;
  email: string;
  plan: string;
  expiresAt: string;
}

interface Message {
  id: string;
  name: string;
  contact: string;
  subject: string;
  message: string;
  date: string;
}

interface Purchase {
  id: string;
  email: string;
  plan: string;
  price: number;
  date: string;
}

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [promos, setPromos] = useState<Promo[]>([
    { id: '1', code: 'WELCOME10', discount: 10, active: true },
    { id: '2', code: 'SUMMER25', discount: 25, active: true }
  ]);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: '1', email: 'user1@mail.com', plan: '1 месяц', expiresAt: '2026-02-15' },
    { id: '2', email: 'user2@mail.com', plan: 'Навсегда', expiresAt: 'Бессрочно' }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      name: 'Иван Петров', 
      contact: 'ivan@mail.com', 
      subject: 'Проблема с активацией',
      message: 'Не могу активировать подписку, помогите пожалуйста',
      date: '2026-01-15 14:30'
    }
  ]);

  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: '1', email: 'buyer1@mail.com', plan: '1 месяц', price: 200, date: '2026-01-15' },
    { id: '2', email: 'buyer2@mail.com', plan: '3 месяца', price: 450, date: '2026-01-14' },
    { id: '3', email: 'buyer3@mail.com', plan: 'Beta доступ', price: 700, date: '2026-01-13' }
  ]);

  const [newPromo, setNewPromo] = useState({ code: '', discount: 0 });
  const [newSub, setNewSub] = useState({ email: '', plan: '1 месяц', days: 30 });

  const addPromo = () => {
    if (newPromo.code && newPromo.discount > 0) {
      setPromos([...promos, { 
        id: Date.now().toString(), 
        code: newPromo.code, 
        discount: newPromo.discount, 
        active: true 
      }]);
      setNewPromo({ code: '', discount: 0 });
    }
  };

  const togglePromo = (id: string) => {
    setPromos(promos.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const deletePromo = (id: string) => {
    setPromos(promos.filter(p => p.id !== id));
  };

  const editPromo = (id: string, discount: number) => {
    setPromos(promos.map(p => p.id === id ? { ...p, discount } : p));
  };

  const addSubscription = () => {
    if (newSub.email) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + newSub.days);
      setSubscriptions([...subscriptions, {
        id: Date.now().toString(),
        email: newSub.email,
        plan: newSub.plan,
        expiresAt: expiresAt.toISOString().split('T')[0]
      }]);
      setNewSub({ email: '', plan: '1 месяц', days: 30 });
    }
  };

  const removeSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(s => s.id !== id));
  };

  const totalRevenue = purchases.reduce((sum, p) => sum + p.price, 0);
  const todayPurchases = purchases.filter(p => p.date === new Date().toISOString().split('T')[0]).length;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-950 border-primary/30">
        <CardHeader className="border-b border-primary/20 sticky top-0 bg-slate-950 z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl text-primary flex items-center gap-3">
                <Icon name="Shield" size={32} />
                Админ-панель Lirider
              </CardTitle>
              <CardDescription>Управление системой</CardDescription>
            </div>
            <Button variant="ghost" onClick={onClose} className="hover:bg-destructive/20">
              <Icon name="X" size={24} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-card/50 mb-6">
              <TabsTrigger value="analytics">
                <Icon name="BarChart3" size={16} className="mr-2" />
                Аналитика
              </TabsTrigger>
              <TabsTrigger value="promos">
                <Icon name="Tag" size={16} className="mr-2" />
                Промокоды
              </TabsTrigger>
              <TabsTrigger value="subscriptions">
                <Icon name="Users" size={16} className="mr-2" />
                Подписки
              </TabsTrigger>
              <TabsTrigger value="messages">
                <Icon name="Mail" size={16} className="mr-2" />
                Сообщения
                {messages.length > 0 && (
                  <Badge className="ml-2 bg-accent text-black">{messages.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-card/50 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="DollarSign" size={20} className="text-primary" />
                      Общий доход
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">{totalRevenue} ₽</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-secondary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="ShoppingCart" size={20} className="text-secondary" />
                      Всего покупок
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-secondary">{purchases.length}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="TrendingUp" size={20} className="text-accent" />
                      Сегодня
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-accent">{todayPurchases}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle>История покупок</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {purchases.map(purchase => (
                      <div key={purchase.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="User" size={20} className="text-primary" />
                          <div>
                            <p className="font-semibold">{purchase.email}</p>
                            <p className="text-sm text-gray-400">{purchase.plan}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{purchase.price} ₽</p>
                          <p className="text-sm text-gray-400">{purchase.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="promos" className="space-y-6">
              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle>Добавить промокод</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label>Код</Label>
                      <Input 
                        placeholder="PROMO2026"
                        value={newPromo.code}
                        onChange={(e) => setNewPromo({...newPromo, code: e.target.value.toUpperCase()})}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="w-32">
                      <Label>Скидка %</Label>
                      <Input 
                        type="number"
                        placeholder="10"
                        value={newPromo.discount || ''}
                        onChange={(e) => setNewPromo({...newPromo, discount: parseInt(e.target.value) || 0})}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={addPromo} className="bg-primary text-black hover:bg-primary/90">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle>Активные промокоды ({promos.filter(p => p.active).length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {promos.map(promo => (
                      <div key={promo.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-4 flex-1">
                          <code className="px-3 py-1 bg-primary/20 rounded font-mono text-primary font-bold">
                            {promo.code}
                          </code>
                          <Input 
                            type="number"
                            value={promo.discount}
                            onChange={(e) => editPromo(promo.id, parseInt(e.target.value) || 0)}
                            className="w-24 bg-background/50"
                          />
                          <span className="text-sm">% скидка</span>
                          <Badge className={promo.active ? 'bg-primary text-black' : 'bg-gray-500'}>
                            {promo.active ? 'Активен' : 'Отключен'}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => togglePromo(promo.id)}
                            className="border-secondary/30"
                          >
                            {promo.active ? 'Отключить' : 'Включить'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deletePromo(promo.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscriptions" className="space-y-6">
              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle>Выдать подписку</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <Label>Email</Label>
                      <Input 
                        type="email"
                        placeholder="user@mail.com"
                        value={newSub.email}
                        onChange={(e) => setNewSub({...newSub, email: e.target.value})}
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <Label>Тариф</Label>
                      <Input 
                        value={newSub.plan}
                        onChange={(e) => setNewSub({...newSub, plan: e.target.value})}
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <Label>Дней</Label>
                      <Input 
                        type="number"
                        value={newSub.days}
                        onChange={(e) => setNewSub({...newSub, days: parseInt(e.target.value) || 30})}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  <Button onClick={addSubscription} className="bg-primary text-black hover:bg-primary/90 mt-4">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Выдать подписку
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle>Активные подписки ({subscriptions.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {subscriptions.map(sub => (
                      <div key={sub.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Icon name="User" size={20} className="text-primary" />
                          <div>
                            <p className="font-semibold">{sub.email}</p>
                            <p className="text-sm text-gray-400">{sub.plan}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-400">До:</p>
                            <p className="font-semibold">{sub.expiresAt}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => removeSubscription(sub.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle>Сообщения из формы обратной связи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.map(msg => (
                      <Card key={msg.id} className="bg-background/30 border-secondary/20">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{msg.subject}</CardTitle>
                            <span className="text-sm text-gray-400">{msg.date}</span>
                          </div>
                          <CardDescription>
                            От: {msg.name} ({msg.contact})
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300">{msg.message}</p>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline" className="border-primary/30">
                              <Icon name="Reply" size={14} className="mr-2" />
                              Ответить
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => setMessages(messages.filter(m => m.id !== msg.id))}
                            >
                              <Icon name="Trash2" size={14} className="mr-2" />
                              Удалить
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
