'use client';

import * as React from 'react';
import Link from "next/link";
import {ColumnDef} from '@tanstack/react-table';
import {
    IconBrandWhatsapp,
    IconCheck,
    IconDotsVertical,
    IconGripVertical,
    IconMail,
    IconPdf,
    IconPlus,
    IconSend,
    IconTrash,
    IconX
} from '@tabler/icons-react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {DataTable} from './DataTable';
import {
    deleteCertificate,
    getCertificates,
    getNextCertificateCode,
    updateCertificate
} from "@/actions/certificate-actions";
import dayjs from "dayjs";
import {useSortable} from "@dnd-kit/sortable";
import {Checkbox} from "@/components/ui/checkbox";
import {toast} from "sonner";
import {CERTIFICATE_STATUS_LABELS, CertificateStatus} from "@/constants/certificate-requests-status";
import {CopyButton} from "@/components/ui/CopyButton";
import {useRouter} from "next/navigation";

function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({
        id,
    });

    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:bg-transparent"
        >
            <IconGripVertical className="size-3 text-muted-foreground" />
            <span className="sr-only">Arrastra para reordenar</span>
        </Button>
    );
}

export default function CertificateRequestsPage() {
    const router = useRouter();
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const columns: ColumnDef<any>[] = [
        {
            id: 'drag',
            header: () => null,
            cell: ({ row }) => <DragHandle id={row.original.id} />,
        },
        {
            id: 'select',
            header: ({ table }) => (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && 'indeterminate')
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'created_at',
            header: 'Fecha de Creación',
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{dayjs(new Date(row.original.created_at)).format("DD/MM/YYYY HH:mm a")}</span>,
        },
        {
            id: 'student',
            header: 'Estudiante / Contacto',
            cell: ({ row }) => {
                const { first_names, paternal_surname, maternal_surname, document_number, email, phone_number } = row.original;
                const fullName = `${first_names} ${paternal_surname} ${maternal_surname || ''}`.trim();

                return (
                    <div className="flex flex-col gap-1 py-1">
                        {/* Nombre Completo */}
                        <div className="group flex items-center">
                    <span className="text-sm font-semibold">
                        {fullName}
                    </span>
                            <CopyButton value={fullName} />
                        </div>

                        <div className="flex flex-col items-start gap-1.5 text-[11px] text-muted-foreground">
                            {/* DNI */}
                            <div className="flex items-center bg-muted/50 px-1.5 py-0.5 rounded border border-border/50">
                        <span className="text-[10px] font-bold uppercase mr-1">
                            {row.original.document_type}:
                        </span>
                                <span className="tabular-nums">{document_number}</span>
                                <CopyButton value={document_number} />
                            </div>

                            {/* Email */}
                            {email && (
                                <div className="flex items-center group">
                                    <IconMail size={12} className="mr-1 shrink-0" />
                                    <span className="truncate max-w-[180px]">{email}</span>
                                    <CopyButton value={email} />
                                </div>
                            )}

                            {/* WhatsApp */}
                            {phone_number && (
                                <div className="flex items-center group text-green-600 dark:text-green-500 font-medium">
                                    <IconBrandWhatsapp size={12} className="mr-1 shrink-0" />
                                    <span className="tabular-nums">{phone_number}</span>
                                    <CopyButton value={phone_number} />
                                </div>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'certificate_code',
            header: 'Código',
            cell: ({ row }) => <span className="text-sm font-mono text-muted-foreground">{row.original.certificate_code || 'No generado'}</span>,
        },
        {
            accessorKey: 'course_name',
            header: 'Curso',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{row.original.course_name}</span>
                    <span className="text-[11px] text-muted-foreground uppercase">{row.original.course_hours} horas lectivas</span>
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Estado',
            cell: ({ row }) => {
                const status = row.original.status as CertificateStatus;
                const config = CERTIFICATE_STATUS_LABELS[status] || CERTIFICATE_STATUS_LABELS.pending;
                const Icon = config.icon;

                return (
                    <Badge variant="outline" className="gap-1.5 px-2 py-0.5 text-muted-foreground">
                        <Icon className={`size-3 ${config.color}`} strokeWidth={3} />
                        {config.label}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row, table }) => {
                const id = row.original.id;

                const refresh = (table.options.meta as any)?.refreshData;

                const handleUpdateApproved = async (msg: string) => {

                    const newCode = await getNextCertificateCode();

                    toast.promise(updateCertificate(id, {
                        status: "approved",
                        certificate_code: newCode
                    }), {
                        loading: 'Procesando...',
                        success: () => { refresh?.(); return msg; },
                        error: (err) => err.message,
                    });
                };

                const handleUpdate = async (updates: any, msg: string) => {
                    toast.promise(updateCertificate(id, updates), {
                        loading: 'Procesando...',
                        success: () => { refresh?.(); return msg; },
                        error: (err) => err.message,
                    });
                };

                const handleDelete = async () => {
                    if (!confirm("¿Estás seguro de eliminar esta solicitud?")) return;
                    toast.promise(deleteCertificate(id), {
                        loading: 'Eliminando...',
                        success: () => { refresh?.(); return "Solicitud eliminada"; },
                        error: (err) => err.message,
                    });
                };

                return (
                    <div className="flex justify-end">
                        {
                            row.original.status !== "rejected" && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost"
                                                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                                                size="icon">
                                            <IconDotsVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem
                                            onClick={() => router.push(`/certificate-requests/${id}/view`)}
                                            className="gap-2 font-medium"
                                        >
                                            <IconPdf size={16} /> Ver PDF
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        {
                                            row.original.status === "approved" && (<DropdownMenuItem
                                                onClick={() => ""}
                                                className="gap-2 text-info"
                                            >
                                                <IconSend size={16} className="text-info" /> Enviar por Correo
                                            </DropdownMenuItem>)
                                        }
                                        {
                                            row.original.status === "pending" && <>
                                                <DropdownMenuItem
                                                    onClick={() => handleUpdateApproved("Solicitud aprobada")}
                                                    className="gap-2 text-success"
                                                >
                                                    <IconCheck size={16} className="text-success" /> Aprobar Solicitud
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleUpdate({ status: 'rejected' }, "Solicitud rechazada")}
                                                    className="gap-2 text-destructive"
                                                >
                                                    <IconX size={16} className="text-destructive" /> Rechazar Solicitud
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={handleDelete}
                                                    className="gap-2 text-destructive"
                                                >
                                                    <IconTrash size={16} className="text-destructive" /> Eliminar
                                                </DropdownMenuItem>
                                            </>
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        }
                    </div>
                );
            },
        },
    ];

    const fetchCertificates = async () => {
        setIsLoading(true);
        try {
            const response = await getCertificates();
            if (response.success) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching certificates:", error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchCertificates();
    }, []);

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                        Solicitudes de Certificados
                    </h1>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">
                        {data.length} registros encontrados en el historial
                    </p>
                </div>
                <Button asChild className="shadow-sm w-full sm:w-auto bg-primary">
                    <Link href="/certificate-requests/new">
                        <IconPlus className="mr-2 size-4" />
                        Nueva Solicitud
                    </Link>
                </Button>
            </div>

            <DataTable data={data} columns={columns} isLoading={isLoading} meta={{
                refreshData: fetchCertificates
            }} />
        </div>
    );
}