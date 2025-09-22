# المساهمة في المشروع

## كيفية المساهمة

1. **Fork** المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. تنفيذ التغييرات المطلوبة
4. **Commit** التغييرات (`git commit -m 'Add amazing feature'`)
5. **Push** إلى الفرع (`git push origin feature/amazing-feature`)
6. فتح **Pull Request**

## متطلبات التطوير

- Node.js 18+
- PNPM (مفضل)
- Git

## إعداد البيئة المحلية

```bash
# استنساخ المشروع
git clone https://github.com/your-username/neon-field.git
cd neon-field

# تثبيت المكتبات
pnpm install

# نسخ ملف البيئة
cp .env.example .env

# تشغيل الخادم المحلي
pnpm dev
```

## معايير الكود

- استخدم TypeScript
- اتبع معايير Prettier
- اكتب اختبارات للميزات الجديدة
- استخدم أسماء متغيرات واضحة

## الإبلاغ عن المشاكل

استخدم GitHub Issues للإبلاغ عن:
- الأخطاء (Bugs)
- طلبات الميزات الجديدة
- تحسينات الأداء