"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Calendar, 
  MessageSquare, 
  User, 
  Clock, 
  Filter,
  CheckCircle,
  Phone,
  XCircle,
  AlertCircle
} from "lucide-react";

interface ContactQuery {
  _id: string;
  name: string;
  email: string;
  message: string;
  appointment: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  createdAt: string;
  updatedAt: string;
}

interface ContactQueriesData {
  queries: ContactQuery[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: {
    total: number;
    new: number;
    contacted: number;
    converted: number;
    closed: number;
  };
}

export default function ContactQueries() {
  const [data, setData] = useState<ContactQueriesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchQueries = async (status = "", page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (page > 1) params.append('page', page.toString());
      
      const response = await fetch(`/api/contact-queries?${params}`);
      const result = await response.json();
      
      if (response.ok) {
        setData(result);
        setError("");
      } else {
        setError(result.error || "Failed to fetch queries");
      }
    } catch {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/contact-queries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        // Refresh the data
        fetchQueries(selectedStatus, currentPage);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  useEffect(() => {
    fetchQueries(selectedStatus, currentPage);
  }, [selectedStatus, currentPage]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="text-yellow-400" size={16} />;
      case 'contacted': return <Phone className="text-blue-400" size={16} />;
      case 'converted': return <CheckCircle className="text-green-400" size={16} />;
      case 'closed': return <XCircle className="text-red-400" size={16} />;
      default: return <AlertCircle className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'contacted': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'converted': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'closed': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">📧 Contact Queries</h2>
          <p className="text-gray-300">Manage and track all contact form submissions</p>
        </div>
        
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="text-cyan-400" size={20} />
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:ring focus:ring-cyan-400/30 outline-none"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="text-cyan-400" size={20} />
              <span className="text-sm text-gray-300">Total</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.stats.total}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="text-yellow-400" size={20} />
              <span className="text-sm text-gray-300">New</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{data.stats.new}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="text-blue-400" size={20} />
              <span className="text-sm text-gray-300">Contacted</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{data.stats.contacted}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-green-400" size={20} />
              <span className="text-sm text-gray-300">Converted</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{data.stats.converted}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg p-4">
          {error}
        </div>
      )}

      {/* Queries List */}
      {data && data.queries.length > 0 ? (
        <div className="space-y-4">
          {data.queries.map((query, index) => (
            <motion.div
              key={query._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 hover:border-cyan-400/50 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Main Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="text-cyan-400" size={20} />
                    <h3 className="text-lg font-semibold text-white">{query.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(query.status)}`}>
                      {getStatusIcon(query.status)}
                      <span className="ml-1 capitalize">{query.status}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Mail className="text-cyan-400" size={16} />
                      <a href={`mailto:${query.email}`} className="hover:text-cyan-400 transition-colors">
                        {query.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="text-cyan-400" size={16} />
                      <span>{new Date(query.appointment).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="text-cyan-400" size={16} />
                      <span>{new Date(query.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-gray-200 text-sm leading-relaxed">{query.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <div className="text-xs text-gray-400 mb-2">Update Status:</div>
                  <select
                    value={query.status}
                    onChange={(e) => updateStatus(query._id, e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-400 focus:ring focus:ring-cyan-400/30 outline-none"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                  
                  <a
                    href={`mailto:${query.email}?subject=Re: Your inquiry from Velosphere Agency&body=Hi ${query.name},%0D%0A%0D%0AThank you for reaching out to us!%0D%0A%0D%0A`}
                    className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:opacity-90 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-all"
                  >
                    📧 Reply
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">No queries found</h3>
          <p className="text-gray-300">
            {selectedStatus 
              ? `No queries with status "${selectedStatus}" found.`
              : "No contact queries have been submitted yet."
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {data && data.pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-400/50 transition-all"
          >
            Previous
          </button>
          
          <span className="text-white px-4 py-2">
            Page {currentPage} of {data.pagination.pages}
          </span>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === data.pagination.pages}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-400/50 transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

