import shutil
from pathlib import Path

def main():
    project_root = Path(__file__).resolve().parents[1]
    assets_dir = project_root / "MEEDX_Assets"

    folders = {
        "screenshots": assets_dir / "01_Screenshots",
        "donations": assets_dir / "02_Donations_QR",
        "telegram": assets_dir / "03_Telegram",
        "apks": assets_dir / "04_Apps_APK",
    }

    for folder in folders.values():
        folder.mkdir(parents=True, exist_ok=True)

    legacy_migrations = {
        assets_dir / "Local Cinema&Local Cinema Manager SCREEN": folders["screenshots"],
        assets_dir / "DONATE AR AND NUBER BANK PHONE NUM": folders["donations"],
    }

    for old_dir, target_dir in legacy_migrations.items():
        if old_dir.exists() and old_dir.is_dir():
            for item in old_dir.iterdir():
                dest = target_dir / item.name
                if not dest.exists():
                    shutil.move(str(item), str(dest))
            if not any(old_dir.iterdir()):
                old_dir.rmdir()
                print(f"[+] تم حذف المجلد القديم بعد نقل محتوياته: {old_dir.name}")

    wallet_file = folders["donations"] / "wallet_numbers.txt"
    if not wallet_file.exists():
        wallet_file.write_text(
            "=== بيانات الدعم المالي لمنصة MEEDX ===\n"
            "ضع صورة باركود زين كاش هنا باسم: zaincash-qr.png\n"
            "ضع صورة باركود كي كارد هنا باسم: qicard-qr.png\n\n"
            "ZainCash_Number = اكتب_رقم_محفظة_زين_كاش_هنا\n"
            "QiCard_Number   = اكتب_رقم_حساب_او_بطاقة_كي_كارد_هنا\n",
            encoding="utf-8",
        )

    telegram_file = folders["telegram"] / "telegram_info.txt"
    if not telegram_file.exists():
        telegram_file.write_text(
            "=== بيانات التواصل والاقتراحات عبر تلجرام ===\n"
            "Telegram_Username = @اكتب_معرفك_هنا\n"
            "Telegram_Link     = https://t.me/اكتب_معرفك_هنا\n",
            encoding="utf-8",
        )

    # ZERO Binary Rule (AGENTS.md): APKs remain in G:\Local Cinema\releases\ and are never copied into G:\MEEDX WEB\MEEDX_Assets.

    readme_file = assets_dir / "README_ASSETS.txt"
    readme_file.write_text(
        "دليل تنظيم ملفات منصة MEEDX:\n"
        "1. 01_Screenshots  -> ضع هنا لقطات الشاشة (Smart_TV_Pro_... و SM-S938B_...)\n"
        "2. 02_Donations_QR -> ضع هنا صورتي باركود زين كاش وكي كارد واكتب الأرقام في wallet_numbers.txt\n"
        "3. 03_Telegram     -> اكتب معرف ورابط التلجرام في ملف telegram_info.txt\n"
        "4. 04_Apps_APK     -> محجوز؛ تبقى ملفات APK في G:\\Local Cinema\\releases\\ فقط وفق قاعدة AGENTS.md ولا تُنسخ إلى هذا المستودع\n",
        encoding="utf-8",
    )

    print("\n========================================================")
    print(" اكتمل تجهيز هيكل مجلدات MEEDX_Assets بنجاح!")
    print("========================================================")
    print(f" المسار: {assets_dir}")
    print(" - 01_Screenshots   (لقطات الشاشة والهاتف)")
    print(" - 02_Donations_QR  (باركودات زين كاش وكي كارد + wallet_numbers.txt)")
    print(" - 03_Telegram      (رابط ومعرف التلجرام في telegram_info.txt)")
    print(" - 04_Apps_APK      (تبقى ملفات APK في G:\\Local Cinema\\releases\\ وفق AGENTS.md)")
    print("========================================================")

if __name__ == "__main__":
    main()