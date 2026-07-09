from pathlib import Path
import re

src_path = Path('src/components/PublicPages.tsx')
text = src_path.read_text('utf-8')
start_idx = text.find('export function PublicPages')
if start_idx == -1:
    raise SystemExit('PublicPages export not found')
prefix = text[:start_idx]
body = text[start_idx:]

# Patterns for top-level functions and const helpers
names = [
    'PpsRpsView', 'BeritaView', 'GaleriView', 'BerandaView', 'ProfilView',
    'PublikasiView', 'AnggaranView', 'LayananView', 'CircularProgress',
    'StatistikView', 'FAQView', 'KontakView', 'PendaftaranView'
]
pattern = re.compile(r'^((?:export )?(?:function|const) )(' + '|'.join(names) + r')\b', re.M)
blocks = []
for m in pattern.finditer(body):
    blocks.append((m.start(), m.group(2)))
blocks.append((len(body), None))

if not blocks:
    raise SystemExit('No blocks detected')

view_dir = Path('src/components/views')
view_dir.mkdir(parents=True, exist_ok=True)

for i in range(len(blocks)-1):
    start, name = blocks[i]
    end = blocks[i+1][0]
    code = body[start:end].rstrip() + '\n'
    if name == 'CircularProgress':
        if not code.strip().startswith('export function'):
            code = code.replace('function CircularProgress', 'export function CircularProgress', 1)
        out_path = view_dir / 'CircularProgress.tsx'
    else:
        out_path = view_dir / f'{name}.tsx'
    out_path.write_text(code, 'utf-8')
    print(f'wrote {out_path}')

# Now recreate PublicPages.tsx with just the wrapper and imports
imports = [
    'import React from "react";',
    'import type { AppSettings, News, Facility, Gallery, Achievement, Announcement, DocumentDownload, BudgetReport, FAQItem, Staff } from "../types";',
    'import { PpsRpsView, BeritaView, GaleriView, BerandaView, ProfilView, PublikasiView, AnggaranView, LayananView, StatistikView, FAQView, KontakView, PendaftaranView } from "./views";',
]
stub = '\n'.join(imports) + '\n\n'
stub += 'interface PublicPagesProps {\n'
stub += '  activeTab: string;\n'
stub += '  setActiveTab: (tab: string) => void;\n'
stub += '  settings: AppSettings;\n'
stub += '  news: News[];\n'
stub += '  facilities: Facility[];\n'
stub += '  galleries: Gallery[];\n'
stub += '  achievements: Achievement[];\n'
stub += '  announcements: Announcement[];\n'
stub += '  documents: DocumentDownload[];\n'
stub += '  budgets: BudgetReport[];\n'
stub += '  faqs: FAQItem[];\n'
stub += '  staff: Staff[];\n'
stub += '}\n\n'
stub += 'export function PublicPages({\n'
stub += '  activeTab, setActiveTab, settings, news, facilities, galleries, achievements, announcements, documents, budgets, faqs, staff\n'
stub += '}: PublicPagesProps) {\n\n'
stub += '  switch (activeTab) {\n'
stub += '    case "beranda":\n'
stub += '      return <BerandaView settings={settings} news={news} facilities={facilities} galleries={galleries} setActiveTab={setActiveTab} />;\n'
stub += '    case "profil":\n'
stub += '      return <ProfilView settings={settings} staff={staff} achievements={achievements} />;\n'
stub += '    case "ppsrps":\n'
stub += '    case "pps_rps_pps_raharjo":\n'
stub += '    case "pps_rps_pamardi_siwi":\n'
stub += '    case "pps_rps_mojomulyo":\n'
stub += '    case "pps_rps_gondang":\n'
stub += '      return <PpsRpsView activeTab={activeTab} setActiveTab={setActiveTab} settings={settings} news={news} facilities={facilities} galleries={galleries} achievements={achievements} staff={staff} />;\n'
stub += '    case "publikasi":\n'
stub += '      return <PublikasiView announcements={announcements} documents={documents} />;\n'
stub += '    case "ppid":\n'
stub += '      return <PublikasiView announcements={announcements} documents={documents} defaultSubTab="ppid" />;\n'
stub += '    case "berita":\n'
stub += '      return <BeritaView news={news} />;\n'
stub += '    case "galeri":\n'
stub += '      return <GaleriView galleries={galleries} />;\n'
stub += '    case "anggaran":\n'
stub += '      return <AnggaranView budgets={budgets} />;\n'
stub += '    case "layanan":\n'
stub += '      return <LayananView />;\n'
stub += '    case "statistik":\n'
stub += '      return <StatistikView news={news} facilities={facilities} />;\n'
stub += '    case "faq":\n'
stub += '      return <FAQView faqs={faqs} />;\n'
stub += '    case "kontak":\n'
stub += '      return <KontakView settings={settings} />;\n'
stub += '    case "pendaftaran":\n'
stub += '      return <PendaftaranView />;\n'
stub += '    default:\n'
stub += '      if (activeTab.startsWith("pps_rps_")) {\n'
stub += '        return <PpsRpsView activeTab={activeTab} setActiveTab={setActiveTab} settings={settings} news={news} facilities={facilities} galleries={galleries} achievements={achievements} staff={staff} />;\n'
stub += '      }\n'
stub += '      return <BerandaView settings={settings} news={news} facilities={facilities} galleries={galleries} setActiveTab={setActiveTab} />;\n'
stub += '  }\n'
stub += '}\n'

src_path.write_text(stub, 'utf-8')
print('PublicPages.tsx rewritten')
