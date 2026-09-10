import { Link } from "@tanstack/react-router";
import { Briefcase, CalendarDays, Clock, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  EMPLOYMENT_TYPE_LABEL,
  EVENT_MODE_LABEL,
  EVENT_TYPE_LABEL,
  WORKPLACE_LABEL,
  formatDate,
  type AlumniEvent,
  type AlumniProfile,
  type JobVacancy,
  type NewsItem,
} from "@/lib/mock-data";

export function AlumniCard({ alumni }: { alumni: AlumniProfile }) {
  return (
    <Card className="card-hover overflow-hidden py-0">
      <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
        <img
          src={alumni.photo_url}
          alt={`Foto ${alumni.full_name}`}
          loading="lazy"
          width={112}
          height={112}
          className="h-20 w-20 rounded-full object-cover ring-2 ring-primary-soft"
        />
        <div>
          <h3 className="text-base font-semibold text-foreground">{alumni.full_name}</h3>
          <p className="text-sm text-muted-foreground">
            {alumni.program} &middot; {alumni.graduation_year}
          </p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-medium text-foreground">{alumni.job_title}</p>
          <p className="text-muted-foreground">{alumni.company_name}</p>
          <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {alumni.city}
          </p>
        </div>
        {alumni.verification_status === "approved" ? (
          <Badge variant="secondary" className="bg-primary-soft text-primary">
            Terverifikasi
          </Badge>
        ) : (
          <Badge variant="outline">Menunggu verifikasi</Badge>
        )}
      </CardContent>
    </Card>
  );
}

export function JobCard({ job }: { job: JobVacancy }) {
  return (
    <Card className="card-hover">
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-sm font-bold text-primary">
            {job.company_logo}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">{job.title}</h3>
            <p className="truncate text-sm text-muted-foreground">{job.company_name}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{EMPLOYMENT_TYPE_LABEL[job.employment_type]}</Badge>
          <Badge variant="outline">{WORKPLACE_LABEL[job.workplace]}</Badge>
          <Badge variant="outline">{job.industry}</Badge>
        </div>
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> {job.city}, {job.province}
          </p>
          <p className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" /> {job.salary_range}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> Ditutup {formatDate(job.deadline)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to="/lowongan">Lihat Lowongan</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function EventCard({ event }: { event: AlumniEvent }) {
  return (
    <Card className="card-hover overflow-hidden pt-0">
      <img
        src={event.image_url}
        alt={event.title}
        loading="lazy"
        width={900}
        height={500}
        className="h-44 w-full object-cover"
      />
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-primary-soft text-primary hover:bg-primary-soft">
            {EVENT_TYPE_LABEL[event.type]}
          </Badge>
          <Badge variant="outline">{EVENT_MODE_LABEL[event.mode]}</Badge>
        </div>
        <h3 className="text-base font-semibold text-foreground">{event.title}</h3>
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" /> {formatDate(event.date)} &middot;{" "}
            {event.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> {event.location}
          </p>
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> {event.registered}/{event.quota} peserta
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to="/event">Lihat Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function NewsCard({ news }: { news: NewsItem }) {
  return (
    <Card className="card-hover overflow-hidden pt-0">
      <img
        src={news.image_url}
        alt={news.title}
        loading="lazy"
        width={900}
        height={500}
        className="h-44 w-full object-cover"
      />
      <CardContent className="space-y-2">
        <Badge variant="secondary">{news.category}</Badge>
        <h3 className="text-base leading-snug font-semibold text-foreground">{news.title}</h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{news.excerpt}</p>
        <p className="text-xs text-muted-foreground">{formatDate(news.published_at)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="px-0 text-primary hover:bg-transparent">
          <Link to="/berita">Baca Selengkapnya →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
