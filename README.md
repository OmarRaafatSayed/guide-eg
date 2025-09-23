# The Guide

مشروع React + Express مع TypeScript - تطبيق ويب متكامل للخرائط والتخطيط.

## المميزات

- 🗺️ متصفح خرائط تفاعلي
- 🤖 دليل AI مدمج
- 📱 تصميم متجاوب
- 🚨 زر الطوارئ
- 📋 مخطط الرحلات
- 🎯 نظام المهام

## التقنيات المستخدمة

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Express + Node.js
- **UI**: Radix UI + Lucide React
- **Routing**: React Router 6
- **Testing**: Vitest
- **Package Manager**: PNPM

## التشغيل المحلي

```bash
# تثبيت المكتبات
pnpm install

# تشغيل الخادم المحلي
pnpm dev

# بناء المشروع للإنتاج
pnpm build

# تشغيل الخادم في الإنتاج
pnpm start
```

## هيكل المشروع

```
client/           # واجهة المستخدم React
├── pages/        # صفحات التطبيق
├── components/   # مكونات UI
└── lib/         # مكتبات مساعدة

server/          # خادم Express
├── routes/      # مسارات API
└── index.ts     # إعداد الخادم

shared/          # أنواع مشتركة
└── api.ts       # واجهات API
```

## النشر

يمكن نشر المشروع على:
- Netlify
- Vercel
- أي خادم يدعم Node.js

## الترخيص

MIT License