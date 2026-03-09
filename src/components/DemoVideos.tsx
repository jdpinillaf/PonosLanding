'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

// --- Types ---

interface Message {
  from: 'user' | 'agent';
  text: string;
  time: string;
  pdf?: { name: string; size: string };
}

interface GmailData {
  to: string;
  subject: string;
  body: string;
  time: string;
}

interface PdfData {
  number: string;
  client: string;
  service: string;
  amount: string;
  date: string;
}

interface SentEmail {
  to: string;
  subject: string;
  preview: string;
  time: string;
  highlighted?: boolean;
}

type ScreenType = 'whatsapp' | 'gmail' | 'pdf' | 'email-list';

type StepAction =
  | { type: 'typing' }
  | { type: 'message'; index: number }
  | { type: 'screen'; to: ScreenType }
  | { type: 'pdf-approve' };

interface Step {
  at: number;
  action: StepAction;
}

interface Demo {
  id: string;
  label: string;
  messages: Message[];
  gmail?: GmailData;
  pdf?: PdfData;
  sentEmails?: SentEmail[];
  steps: Step[];
}

interface DemoLocaleItem {
  label: string;
  messages: { text: string }[];
  gmail?: { subject: string; body: string };
  pdf?: { client: string; service: string; date: string };
  sentEmails?: { subject: string; preview: string }[];
}

// --- Build demos from locale data ---

function buildDemos(items: DemoLocaleItem[]): Demo[] {
  return [
    {
      id: 'briefing',
      label: items[0]?.label ?? '',
      messages: [
        { from: 'user', text: items[0]?.messages[0]?.text ?? '', time: '8:01 AM' },
        { from: 'agent', text: items[0]?.messages[1]?.text ?? '', time: '8:01 AM' },
      ],
      steps: [
        { at: 400, action: { type: 'typing' } },
        { at: 1400, action: { type: 'message', index: 0 } },
        { at: 1700, action: { type: 'typing' } },
        { at: 2700, action: { type: 'message', index: 1 } },
      ],
    },
    {
      id: 'correo',
      label: items[1]?.label ?? '',
      messages: [
        { from: 'user', text: items[1]?.messages[0]?.text ?? '', time: '10:15 AM' },
        { from: 'agent', text: items[1]?.messages[1]?.text ?? '', time: '10:15 AM' },
      ],
      gmail: {
        to: 'carlos@logisticanorte.com',
        subject: items[1]?.gmail?.subject ?? '',
        body: items[1]?.gmail?.body ?? '',
        time: '10:15 AM',
      },
      steps: [
        { at: 400, action: { type: 'typing' } },
        { at: 1400, action: { type: 'message', index: 0 } },
        { at: 1700, action: { type: 'typing' } },
        { at: 2700, action: { type: 'message', index: 1 } },
        { at: 4500, action: { type: 'screen', to: 'gmail' } },
      ],
    },
    {
      id: 'template',
      label: items[2]?.label ?? '',
      messages: [
        { from: 'user', text: items[2]?.messages[0]?.text ?? '', time: '2:30 PM' },
        { from: 'agent', text: items[2]?.messages[1]?.text ?? '', time: '2:31 PM' },
      ],
      gmail: {
        to: 'finanzas@grupoandino.com',
        subject: items[2]?.gmail?.subject ?? '',
        body: items[2]?.gmail?.body ?? '',
        time: '2:31 PM',
      },
      steps: [
        { at: 400, action: { type: 'typing' } },
        { at: 1400, action: { type: 'message', index: 0 } },
        { at: 1700, action: { type: 'typing' } },
        { at: 2700, action: { type: 'message', index: 1 } },
        { at: 4500, action: { type: 'screen', to: 'gmail' } },
      ],
    },
    {
      id: 'facturacion',
      label: items[3]?.label ?? '',
      messages: [
        {
          from: 'agent',
          text: items[3]?.messages[0]?.text ?? '',
          time: '4:45 PM',
          pdf: { name: 'Factura_0892.pdf', size: '145 KB' },
        },
      ],
      pdf: {
        number: '0892',
        client: items[3]?.pdf?.client ?? '',
        service: items[3]?.pdf?.service ?? '',
        amount: '$2,800.00 USD',
        date: items[3]?.pdf?.date ?? '',
      },
      sentEmails: [
        {
          to: 'pagos@logisticanorte.com',
          subject: items[3]?.sentEmails?.[0]?.subject ?? '',
          preview: items[3]?.sentEmails?.[0]?.preview ?? '',
          time: '4:48 PM',
          highlighted: true,
        },
        {
          to: 'finanzas@grupoandino.com',
          subject: items[3]?.sentEmails?.[1]?.subject ?? '',
          preview: items[3]?.sentEmails?.[1]?.preview ?? '',
          time: '1 Mar',
        },
        {
          to: 'admin@transportesvalle.com',
          subject: items[3]?.sentEmails?.[2]?.subject ?? '',
          preview: items[3]?.sentEmails?.[2]?.preview ?? '',
          time: '15 Feb',
        },
        {
          to: 'compras@industriasmx.com',
          subject: items[3]?.sentEmails?.[3]?.subject ?? '',
          preview: items[3]?.sentEmails?.[3]?.preview ?? '',
          time: '3 Feb',
        },
      ],
      steps: [
        { at: 400, action: { type: 'typing' } },
        { at: 1400, action: { type: 'message', index: 0 } },
        { at: 3200, action: { type: 'screen', to: 'pdf' } },
        { at: 5200, action: { type: 'pdf-approve' } },
        { at: 7000, action: { type: 'screen', to: 'email-list' } },
      ],
    },
  ];
}

// --- Sub-components ---

function TypingIndicator() {
  return (
    <div className="flex items-end px-1 py-1">
      <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          {[0, 200, 400].map((d) => (
            <span
              key={d}
              className="h-[6px] w-[6px] rounded-full bg-gray-400"
              style={{ animation: 'typing-dot 1.4s infinite', animationDelay: `${d}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message, visible }: { message: Message; visible: boolean }) {
  const isUser = message.from === 'user';
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-1`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
      }}
    >
      <div
        className={`max-w-[85%] rounded-xl px-3 py-2 shadow-sm text-[13px] leading-[1.45] ${
          isUser ? 'bg-[#D9FDD3] rounded-tr-sm text-gray-900' : 'bg-white rounded-tl-sm text-gray-900'
        }`}
      >
        <p className="whitespace-pre-line">{message.text}</p>
        {message.pdf && (
          <div className="mt-2 flex items-center gap-2.5 rounded-lg bg-[#f5f6f6] p-2.5">
            <div className="flex h-10 w-8 shrink-0 items-center justify-center rounded bg-[#E53935] text-[10px] font-bold text-white">
              PDF
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-gray-800">{message.pdf.name}</p>
              <p className="text-[10px] text-gray-500">{message.pdf.size}</p>
            </div>
          </div>
        )}
        <p className="mt-0.5 flex items-center justify-end gap-0.5 text-[10px] text-[#667781]">
          {message.time}
          {isUser && (
            <svg className="h-[14px] w-[14px] text-[#53BDEB]" viewBox="0 0 16 15" fill="currentColor">
              <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
            </svg>
          )}
        </p>
      </div>
    </div>
  );
}

// --- WhatsApp Screen ---

function WhatsAppScreen({
  messages,
  visibleMessages,
  showTyping,
  labels,
}: {
  messages: Message[];
  visibleMessages: number[];
  showTyping: boolean;
  labels: { online: string; messagePlaceholder: string; today: string };
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#075E54] px-4 py-2.5">
        <svg className="h-5 w-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DFE5E7]">
          <svg className="h-5 w-5 text-[#075E54]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium text-white">Victoria (Ponos AI)</p>
          <p className="text-[11px] text-[#a8d8c8]">{labels.online}</p>
        </div>
        <div className="flex gap-5 text-white/80">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="6" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="18" r="2" />
          </svg>
        </div>
      </div>

      {/* Chat area */}
      <div
        className="flex flex-1 flex-col gap-2 p-3"
        style={{
          backgroundColor: '#ECE5DD',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c8c3ba' fill-opacity='0.12'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3Ccircle cx='60' cy='20' r='1.5'/%3E%3Ccircle cx='40' cy='50' r='1.5'/%3E%3Ccircle cx='10' cy='60' r='1.5'/%3E%3Ccircle cx='70' cy='65' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="mb-1 flex justify-center">
          <span className="rounded-lg bg-[#E1F2FB] px-3 py-1 text-[11px] text-[#5F7E8A] shadow-sm">{labels.today}</span>
        </div>
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} visible={visibleMessages.includes(i)} />
        ))}
        {showTyping && <TypingIndicator />}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 bg-[#F0F0F0] px-2 py-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center text-[#54656F]">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1 rounded-full bg-white px-4 py-2 text-[14px] text-[#667781]">{labels.messagePlaceholder}</div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00A884]">
          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// --- Gmail Screen ---

function GmailScreen({ email, labels }: { email: GmailData; labels: { sent: string; reply: string; forward: string; to: string } }) {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-4 border-b border-gray-200 px-4 py-3">
        <svg className="h-5 w-5 text-[#5f6368]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <div className="flex-1" />
        <svg className="h-5 w-5 text-[#5f6368]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
        </svg>
        <svg className="h-5 w-5 text-[#5f6368]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <svg className="h-5 w-5 text-[#5f6368]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <svg className="h-5 w-5 text-[#5f6368]" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      </div>

      {/* Subject + label */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-start gap-2">
          <h3 className="flex-1 text-[16px] font-normal leading-tight text-[#202124]">{email.subject}</h3>
        </div>
        <span className="mt-1.5 inline-block rounded bg-[#ddd] px-2 py-0.5 text-[10px] font-medium text-[#5f6368]">
          {labels.sent}
        </span>
      </div>

      {/* Sender info */}
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C47B2B] text-[14px] font-bold text-white">
          P
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <p className="text-[14px] font-medium text-[#202124]">Victoria — Ponos AI</p>
            <p className="text-[11px] text-[#5f6368]">{email.time}</p>
          </div>
          <p className="mt-0.5 text-[12px] text-[#5f6368]">{labels.to} {email.to}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden px-4 py-2">
        <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#3c4043]">{email.body}</p>
      </div>

      {/* Reply bar */}
      <div className="flex gap-2 border-t border-gray-200 px-4 py-3">
        <button className="flex-1 rounded-full border border-gray-300 py-2 text-center text-[13px] text-[#5f6368]">
          {labels.reply}
        </button>
        <button className="flex-1 rounded-full border border-gray-300 py-2 text-center text-[13px] text-[#5f6368]">
          {labels.forward}
        </button>
      </div>
    </div>
  );
}

// --- PDF Screen ---

function PdfViewerScreen({ pdf, approved, labels }: { pdf: PdfData; approved: boolean; labels: { invoice: string; client: string; service: string; date: string; total: string; approved: string; reject: string; approve: string } }) {
  return (
    <div className="flex h-full flex-col bg-[#525659]">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#3c4043] px-4 py-3">
        <svg className="h-5 w-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <p className="flex-1 truncate text-[13px] font-medium text-white">{labels.invoice}_{pdf.number}.pdf</p>
        <svg className="h-5 w-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </div>

      {/* Document */}
      <div className="flex flex-1 items-start justify-center overflow-hidden p-4">
        <div className="w-full max-w-[260px] rounded bg-white p-5 shadow-lg">
          {/* Invoice header */}
          <div className="border-b border-gray-200 pb-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C47B2B]">{labels.invoice}</p>
            <p className="mt-0.5 text-[18px] font-bold text-[#202124]">#{pdf.number}</p>
          </div>
          {/* Details */}
          <div className="mt-3 space-y-2 text-[11px] text-[#3c4043]">
            <div>
              <p className="text-[9px] font-medium uppercase text-gray-400">{labels.client}</p>
              <p>{pdf.client}</p>
            </div>
            <div>
              <p className="text-[9px] font-medium uppercase text-gray-400">{labels.service}</p>
              <p>{pdf.service}</p>
            </div>
            <div>
              <p className="text-[9px] font-medium uppercase text-gray-400">{labels.date}</p>
              <p>{pdf.date}</p>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <p className="text-[9px] font-medium uppercase text-gray-400">{labels.total}</p>
              <p className="text-[16px] font-bold text-[#202124]">{pdf.amount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Approve/Reject */}
      <div className="border-t border-[#3c4043] bg-[#3c4043] px-4 py-3">
        {approved ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-[#1B7A5A] py-3 text-[14px] font-medium text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {labels.approved}
          </div>
        ) : (
          <div className="flex gap-3">
            <div className="flex-1 rounded-xl bg-[#5f6368] py-3 text-center text-[13px] font-medium text-white/80">
              {labels.reject}
            </div>
            <div className="flex-1 rounded-xl bg-[#1B7A5A] py-3 text-center text-[13px] font-medium text-white">
              {labels.approve}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Email List Screen ---

function EmailListScreen({ emails, labels }: { emails: SentEmail[]; labels: { sent: string; searchMail: string; billing: string } }) {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
        <svg className="h-5 w-5 text-[#5f6368]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <p className="text-[16px] font-medium text-[#202124]">{labels.sent}</p>
        <div className="flex-1" />
        <svg className="h-5 w-5 text-[#5f6368]" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      </div>

      {/* Search */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 rounded-full bg-[#f1f3f4] px-4 py-2">
          <svg className="h-4 w-4 text-[#5f6368]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[13px] text-[#5f6368]">{labels.searchMail}</span>
        </div>
      </div>

      {/* Label */}
      <div className="px-4 py-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wide text-[#5f6368]">
          {labels.billing}
        </span>
      </div>

      {/* Email rows */}
      <div className="flex-1 overflow-hidden">
        {emails.map((email, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 border-b border-gray-100 px-4 py-3 ${
              email.highlighted ? 'bg-[#E8F0FE]' : ''
            }`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C47B2B] text-[11px] font-bold text-white">
              {email.to[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className={`truncate text-[13px] ${email.highlighted ? 'font-bold text-[#202124]' : 'font-medium text-[#202124]'}`}>
                  {email.to}
                </p>
                <span className={`shrink-0 text-[11px] ${email.highlighted ? 'font-bold text-[#202124]' : 'text-[#5f6368]'}`}>
                  {email.time}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-[#5f6368]">{email.subject}</p>
              <p className="truncate text-[11px] text-[#9aa0a6]">{email.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Component ---

export default function DemoVideos() {
  const { t, tArray, tObject } = useTranslation();
  const demoItems = tArray<DemoLocaleItem>('demos.items');
  const demos = useMemo(() => buildDemos(demoItems), [demoItems]);

  const whatsappLabels = tObject<{ online: string; messagePlaceholder: string; today: string }>('demos.whatsapp');
  const gmailLabels = tObject<{ sent: string; reply: string; forward: string; to: string; searchMail: string; billing: string }>('demos.gmail');
  const pdfLabels = tObject<{ invoice: string; client: string; service: string; date: string; total: string; approved: string; reject: string; approve: string }>('demos.pdf');

  const [activeTab, setActiveTab] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [screen, setScreen] = useState<ScreenType>('whatsapp');
  const [pdfApproved, setPdfApproved] = useState(false);
  const [screenKey, setScreenKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const activeDemo = demos[activeTab];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runSteps = useCallback(() => {
    clearTimers();
    setVisibleMessages([]);
    setShowTyping(false);
    setScreen('whatsapp');
    setPdfApproved(false);
    setScreenKey((k) => k + 1);

    activeDemo.steps.forEach((step) => {
      const id = setTimeout(() => {
        switch (step.action.type) {
          case 'typing':
            setShowTyping(true);
            break;
          case 'message':
            setShowTyping(false);
            setVisibleMessages((prev) => [...prev, step.action.type === 'message' ? step.action.index : -1]);
            break;
          case 'screen':
            setScreen(step.action.to);
            setScreenKey((k) => k + 1);
            break;
          case 'pdf-approve':
            setPdfApproved(true);
            break;
        }
      }, step.at);
      timersRef.current.push(id);
    });

    // Auto-advance to next demo after animation ends + 3s reading pause
    const lastStepAt = Math.max(...activeDemo.steps.map((s) => s.at));
    const advanceId = setTimeout(() => {
      setActiveTab((prev) => (prev + 1) % demos.length);
    }, lastStepAt + 3000);
    timersRef.current.push(advanceId);
  }, [activeDemo, demos.length, clearTimers]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) setHasBeenVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasBeenVisible]);

  useEffect(() => {
    if (hasBeenVisible) runSteps();
    return clearTimers;
  }, [hasBeenVisible, activeTab, runSteps, clearTimers]);

  const renderScreen = () => {
    switch (screen) {
      case 'whatsapp':
        return (
          <WhatsAppScreen
            messages={activeDemo.messages}
            visibleMessages={visibleMessages}
            showTyping={showTyping}
            labels={whatsappLabels}
          />
        );
      case 'gmail':
        return activeDemo.gmail ? <GmailScreen email={activeDemo.gmail} labels={gmailLabels} /> : null;
      case 'pdf':
        return activeDemo.pdf ? <PdfViewerScreen pdf={activeDemo.pdf} approved={pdfApproved} labels={pdfLabels} /> : null;
      case 'email-list':
        return activeDemo.sentEmails ? <EmailListScreen emails={activeDemo.sentEmails} labels={gmailLabels} /> : null;
      default:
        return null;
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes typing-dot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        @keyframes screen-enter {
          from { transform: translateX(60px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes tab-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <section id="demos" className="px-6 py-28" ref={sectionRef}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
              {t('demos.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-warm-gray">
              {t('demos.subtitle')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-16 flex justify-center">
              <div className="w-full max-w-sm">
                {/* Tabs */}
                <div className="mb-5 flex flex-wrap justify-center gap-2 overflow-x-auto pb-1">
                  {demos.map((demo, i) => {
                    const isActive = activeTab === i;
                    const totalDuration = isActive
                      ? Math.max(...demo.steps.map((s) => s.at)) + 3000
                      : 0;
                    return (
                      <button
                        key={demo.id}
                        onClick={() => setActiveTab(i)}
                        className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 overflow-hidden ${
                          isActive
                            ? 'bg-[#075E54] text-white shadow-md'
                            : 'bg-sand text-warm-gray hover:text-carbon'
                        }`}
                      >
                        {isActive && hasBeenVisible && (
                          <span
                            key={`${activeTab}-${screenKey}`}
                            className="absolute inset-0 rounded-full bg-white/15"
                            style={{
                              animation: `tab-progress ${totalDuration}ms linear forwards`,
                              transformOrigin: 'left',
                            }}
                          />
                        )}
                        <span className="relative">{demo.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Phone frame */}
                <div className="overflow-hidden rounded-[2.5rem] border-[6px] border-[#1a1a1a] bg-[#1a1a1a] shadow-2xl shadow-black/20">
                  {/* Notch */}
                  <div className="relative flex items-center justify-center bg-[#1a1a1a] py-2">
                    <div className="h-[22px] w-[120px] rounded-full bg-[#0d0d0d]" />
                  </div>

                  {/* Screen content */}
                  <div className="relative h-[480px] overflow-hidden">
                    <div
                      key={screenKey}
                      className="absolute inset-0"
                      style={screenKey > 1 ? { animation: 'screen-enter 0.4s ease-out' } : undefined}
                    >
                      {renderScreen()}
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex justify-center bg-[#1a1a1a] pb-3 pt-1">
                    <div className="h-1 w-32 rounded-full bg-[#555]" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
